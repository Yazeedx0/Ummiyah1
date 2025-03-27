import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const grades = await prisma.grades.findMany({
      include: {
        subjects: {
          orderBy: {
            id: 'asc'
          },
          include: {
            units: {
              orderBy: {
                id: 'asc'
              },
              include: {
                lessons: {
                  orderBy: {
                    id: 'asc'
                  },
                  include: {
                    objectives: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    });

    if (!grades.length) {
      return res.status(404).json({ error: 'No grades found' });
    }

    res.status(200).json(grades);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب البيانات' });
  }
}
