import { NextRequest, NextResponse } from 'next/server';
import { News, User } from '@/lib/db/models';
import logger from '@/lib/logger';

/**
 * GET /api/news — Danh sách tin tức public (đã publish)
 * Query params: page, limit, search
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
    const search = searchParams.get('search') || '';
    const offset = (page - 1) * limit;

    const where: Record<string, unknown> = { isPublished: true };

    if (search) {
      const { Op } = await import('sequelize');
      where[Op.or as unknown as string] = [
        { title: { [Op.like]: `%${search}%` } },
        { summary: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await News.findAndCountAll({
      where,
      include: [{ model: User, as: 'author', attributes: ['id', 'name'] }],
      order: [['publishedAt', 'DESC']],
      limit,
      offset,
      attributes: ['id', 'title', 'slug', 'thumbnail', 'summary', 'publishedAt', 'createdAt'],
    });

    const totalPages = Math.ceil(count / limit);

    return NextResponse.json({
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch news list');
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
