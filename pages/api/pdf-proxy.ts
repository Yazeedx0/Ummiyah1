import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Readable } from 'stream';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the URL from query parameters
  const { url } = req.query;

  // Validate URL parameter
  if (!url || Array.isArray(url)) {
    return res.status(400).json({ error: 'A valid URL parameter is required' });
  }

  try {
    // Log the request for debugging
    console.log(`PDF Proxy: Fetching ${url}`);

    // Use axios to fetch the PDF with streaming
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream', // Important for streaming
      timeout: 30000, // 30 seconds timeout
      headers: {
        // Some servers require a user agent to be specified
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      // Don't throw errors on non-200 responses, we'll handle them
      validateStatus: () => true,
    });

    // Handle error status codes
    if (response.status >= 400) {
      console.error(`PDF Proxy: Error fetching PDF, status code ${response.status}`);
      return res.status(response.status).json({
        error: `External server responded with status ${response.status}`,
        url: url
      });
    }

    // Get content type, defaulting to application/pdf if not provided
    const contentType = response.headers['content-type'] || 'application/pdf';
    console.log(`PDF Proxy: Content-Type from source: ${contentType}`);

    // Set appropriate content type and headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');
    
    // Explicitly allow embedding in iframes from any origin
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.removeHeader('Content-Security-Policy');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Set caching headers to improve performance
    res.setHeader('Cache-Control', 'public, max-age=3600');

    // Stream the PDF data
    response.data.pipe(res);
  } catch (error) {
    console.error('PDF Proxy Error:', error);

    // Provide a detailed error response
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.statusText || error.message;

      return res.status(statusCode).json({
        error: `Failed to fetch PDF: ${errorMessage}`,
        details: error.message,
        url: url
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      url: url
    });
  }
}

// Configure the API route to handle large files
export const config = {
  api: {
    responseLimit: false,
    bodyParser: false,
  },
};
