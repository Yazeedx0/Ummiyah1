import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const navigationData = await prisma.grades.findMany({
      orderBy: {
        id: 'asc'
      },
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
                  }
                }
              }
            }
          }
        }
      }
    });

    res.status(200).json(navigationData);
  } catch (error) {
    console.error('Error fetching navigation data:', error);
    res.status(500).json({ error: 'Failed to fetch navigation data' });
  }
}
