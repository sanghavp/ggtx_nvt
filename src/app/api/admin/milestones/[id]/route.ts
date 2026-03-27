import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { Milestone } from '@/lib/db/models';
import logger from '@/lib/logger';

// PUT /api/admin/milestones/[id]
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const resolvedParams = await context.params;
  
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const milestone = await Milestone.findByPk(resolvedParams.id);
    if (!milestone) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const body = await request.json();
    await milestone.update({
      year: body.year !== undefined ? body.year : milestone.year,
      title: body.title !== undefined ? body.title : milestone.title,
      description: body.description !== undefined ? body.description : milestone.description,
      sortOrder: body.sortOrder !== undefined ? body.sortOrder : milestone.sortOrder,
    });

    return NextResponse.json({ data: milestone });
  } catch (error) {
    logger.error({ error }, 'Failed to update milestone');
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

// DELETE /api/admin/milestones/[id]
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const resolvedParams = await context.params;

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const milestone = await Milestone.findByPk(resolvedParams.id);
    if (!milestone) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await milestone.destroy();
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error({ error }, 'Failed to delete milestone');
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
