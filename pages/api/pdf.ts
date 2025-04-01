import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subject_id } = req.query;

  if (!subject_id || Array.isArray(subject_id)) {
    return res.status(400).json({ error: 'A valid subject_id parameter is required' });
  }

  try {
    const subjectIdNum = parseInt(subject_id, 10);
    console.log(`Fetching PDF for subject_id: ${subjectIdNum}`);

    // Check if the url_pdf model exists in prisma client
    const availableModels = Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$'));
    console.log('Available Prisma models:', availableModels);

    // Check if model exists before trying to use it
    if (!availableModels.includes('url_pdf')) {
      console.error('The url_pdf model is not available in the Prisma client');
      return res.status(500).json({
        error: 'PDF functionality is not available',
        details: 'The required database model is missing. Please run prisma generate and prisma migrate.',
        availableModels
      });
    }

    // Now we can safely use the model
    const pdfData = await prisma.url_pdf.findFirst({
      where: {
        subject_id: subjectIdNum
      },
    });

    console.log('PDF data found:', pdfData ? 'yes' : 'no');

    if (!pdfData) {
      return res.status(404).json({
        error: 'No PDF found for this subject',
        subjectId: subjectIdNum
      });
    }

    res.status(200).json(pdfData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', error);
    console.error('Error fetching PDF data:', errorMessage);

    res.status(500).json({
      error: 'Failed to fetch PDF data',
      details: errorMessage,
      subjectId: req.query.subject_id
    });
  }
}
