import { NextResponse } from 'next/server';
import { Milestone } from '@/lib/db/models';
import logger from '@/lib/logger';

/**
 * GET /api/milestones
 * Lấy danh sách các cột mốc lịch sử phát triển
 */
export async function GET() {
  try {
    const milestones = await Milestone.findAll({
      order: [['sortOrder', 'ASC'], ['year', 'ASC']],
    });

    return NextResponse.json({ data: milestones.map(m => m.toJSON()) });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch milestones');
    return NextResponse.json(
      { error: 'Failed to fetch milestones' },
      { status: 500 }
    );
  }
}
