/**
 * Format lesson content into structured HTML with proper paragraphs and lists
 * @param content The raw content from the database
 * @returns Formatted HTML string
 */
export function formatContent(content: string | null | undefined): string {
  try {
    if (!content) return '';

    // Clean up any excessive whitespace or line breaks
    let cleanContent = content.trim();

    // Add debug logging
    console.log('Formatting content:', cleanContent.substring(0, 50) + '...');

    // Process content that's already HTML
    if (cleanContent.includes('<') && cleanContent.includes('>')) {
      console.log('Content appears to be HTML');
      // If content already has HTML structure, return it with minimal processing
      // Add proper spacing to list items if they exist
      cleanContent = cleanContent
        .replace(/<li>/g, '<li class="mb-2">')
        .replace(/<p>/g, '<p class="mb-4">');

      return cleanContent;
    }

    // Split content by common line break indicators
    const lines = cleanContent.split(/(?:\r?\n|<br\s*\/?>)/g);

    // Process the lines
    const formattedParts: string[] = [];
    let inList = false;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        // Empty line - close any open list and add a break
        if (inList) {
          formattedParts.push('</ul>');
          inList = false;
        }
        return;
      }

      // Check for bullet points - Arabic and English patterns
      const bulletPattern = /^[-•*]|\d+[.)]|[\u0660-\u0669]+[.)]|[أابتثجحخدذرزسشصضطظعغفقكلمنهوي][.)]|\u2022|\u25CF|\u25CB|\u25E6|\u2023/;
      const isBullet = bulletPattern.test(trimmedLine);

      // Process sentences
      if (!isBullet) {
        // Split into sentences for better readability if the line is long
        if (trimmedLine.length > 100) {
          const sentences = trimmedLine.split(/([.!?؟:;،])\s+/);

          // Close any open list
          if (inList) {
            formattedParts.push('</ul>');
            inList = false;
          }

          for (let i = 0; i < sentences.length; i += 2) {
            if (sentences[i].trim()) {
              const sentenceWithPunctuation = sentences[i] + (sentences[i + 1] || '');
              if (sentenceWithPunctuation.trim()) {
                formattedParts.push(`<p class="mb-3 leading-relaxed text-[#334155]">${sentenceWithPunctuation.trim()}</p>`);
              }
            }
          }
        } else {
          // Close any open list
          if (inList) {
            formattedParts.push('</ul>');
            inList = false;
          }

          formattedParts.push(`<p class="mb-3 leading-relaxed text-[#334155]">${trimmedLine}</p>`);
        }
      } else {
        // Handle bullet points
        if (!inList) {
          formattedParts.push('<ul class="list-disc pr-6 space-y-2 mb-4">');
          inList = true;
        }

        // Extract the bullet and content
        const bulletMatch = trimmedLine.match(bulletPattern);
        let cleanedContent = trimmedLine;

        if (bulletMatch) {
          const bullet = bulletMatch[0];
          cleanedContent = trimmedLine.substring(bullet.length).trim();
        }

        formattedParts.push(`<li class="text-[#334155]">${cleanedContent}</li>`);
      }
    });

    // Close any open list
    if (inList) {
      formattedParts.push('</ul>');
    }

    return formattedParts.join('');
  } catch (error) {
    console.error('Error formatting content:', error);
    return '<p class="text-red-500">Error formatting content</p>';
  }
}
