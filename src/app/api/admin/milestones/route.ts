import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { Milestone } from '@/lib/db/models';
import logger from '@/lib/logger';

// GET /api/admin/milestones
export async function GET() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const milestones = await Milestone.findAll({
      order: [['sortOrder', 'ASC'], ['year', 'ASC']],
    });
    return NextResponse.json({ data: milestones });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch milestones');
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

// POST /api/admin/milestones
export async function POST(request: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { year, title, description, sortOrder } = body;

    if (!year || !title) {
      return NextResponse.json({ error: 'Year and title are required' }, { status: 400 });
    }

    const milestone = await Milestone.create({
      year,
      title,
      description,
      sortOrder: sortOrder || 0,
    });

    return NextResponse.json({ data: milestone }, { status: 201 });
  } catch (error) {
    logger.error({ error }, 'Failed to create milestone');
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
