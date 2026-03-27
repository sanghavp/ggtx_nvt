import { NextRequest, NextResponse } from 'next/server';
import { News, User } from '@/lib/db/models';
import logger from '@/lib/logger';

/**
 * GET /api/news/[slug] — Chi tiết bài viết
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const article = await News.findOne({
      where: { slug, is_published: true },
      include: [{ model: User, as: 'author', attributes: ['id', 'name'] }],
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Bài viết không tồn tại' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: article });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch news detail');
    return NextResponse.json(
      { error: 'Failed to fetch news detail' },
      { status: 500 }
    );
  }
}
