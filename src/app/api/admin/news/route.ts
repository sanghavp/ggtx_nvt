import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { News } from '@/lib/db/models';
import logger from '@/lib/logger';

// Utils to generate slug
const generateSlug = (title: string) => {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// GET /api/admin/news - Get all news for Admin (with pagination)
export async function GET(request: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await News.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    return NextResponse.json({
      data: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch admin news');
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// POST /api/admin/news - Create a new article
export async function POST(request: Request) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, summary, content, thumbnail, isPublished, publishedAt } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    let slug = generateSlug(title);
    let counter = 1;
    while (await News.findOne({ where: { slug } })) {
      slug = `${generateSlug(title)}-${counter}`;
      counter++;
    }

    const news = await News.create({
      title,
      slug,
      summary,
      content,
      thumbnail,
      isPublished: !!isPublished,
      publishedAt: isPublished ? (publishedAt || new Date()) : null,
      authorId: parseInt((session.user as any).id, 10),
    });

    return NextResponse.json({ data: news }, { status: 201 });
  } catch (error) {
    logger.error({ error }, 'Failed to create news');
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}
