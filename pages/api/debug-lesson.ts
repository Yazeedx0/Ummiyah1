import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lessonId } = req.query;

  if (!lessonId || typeof lessonId !== 'string') {
    return res.status(400).json({ error: 'Lesson ID is required' });
  }

  try {
    // Get the lesson directly from the database
    const lesson = await prisma.lessons.findUnique({
      where: {
        id: parseInt(lessonId)
      },
      include: {
        objectives: true
      }
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Return detailed info about the lesson
    return res.status(200).json({
      lesson,
      contentInfo: {
        isNull: lesson.content === null,
        isEmpty: lesson.content === '',
        length: lesson.content?.length || 0,
        trimmedLength: lesson.content?.trim().length || 0,
        hasHtmlTags: lesson.content?.includes('<') && lesson.content?.includes('>'),
        sample: lesson.content?.substring(0, 200)
      }
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return res.status(500).json({ error: 'Failed to fetch lesson' });
  }
}
