import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { News } from '@/lib/db/models';
import logger from '@/lib/logger';

// Helpers
const generateSlug = (title: string) => {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// PUT /api/admin/news/[id] - Update an article
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const resolvedParams = await context.params;
  const id = resolvedParams.id;
  
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const article = await News.findByPk(id);
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const body = await request.json();
    const { title, summary, content, thumbnail, isPublished, publishedAt } = body;

    let slug = article.slug;
    if (title && title !== article.title) {
      slug = generateSlug(title);
      let counter = 1;
      while (await News.findOne({ where: { slug } })) {
        if (slug === article.slug) break;
        slug = `${generateSlug(title)}-${counter}`;
        counter++;
      }
    }

    await article.update({
      title: title || article.title,
      slug,
      summary: summary !== undefined ? summary : article.summary,
      content: content || article.content,
      thumbnail: thumbnail !== undefined ? thumbnail : article.thumbnail,
      isPublished: isPublished !== undefined ? isPublished : article.isPublished,
      publishedAt: isPublished ? (publishedAt || article.publishedAt || new Date()) : null,
    });

    return NextResponse.json({ data: article });
  } catch (error) {
    logger.error({ error }, 'Failed to update news');
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

// DELETE /api/admin/news/[id] - Delete an article
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const resolvedParams = await context.params;
  const id = resolvedParams.id;

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const article = await News.findByPk(id);
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await article.destroy();
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error({ error }, 'Failed to delete news');
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
