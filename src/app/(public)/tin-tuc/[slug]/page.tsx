import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { News, User } from '@/lib/db/models';
import { formatDate } from '@/lib/utils';
import logger from '@/lib/logger';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  try {
    const article = await News.findOne({
      where: { slug, isPublished: true },
      include: [{ model: User, as: 'author', attributes: ['id', 'name'] }],
    });
    return article ? article.toJSON() : null;
  } catch (error) {
    logger.error({ error }, 'Failed to fetch article');
    return null;
  }
}

// Dynamic metadata cho SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: 'Bài viết không tồn tại' };
  }

  return {
    title: article.title,
    description: article.summary || article.title,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <Link href="/tin-tuc" className={styles.back}>
            ← Quay lại tin tức
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className={styles.article}>
        <div className={styles.container}>
          {/* Thumbnail */}
          {article.thumbnail && (
            <div className={styles.thumbnailWrapper}>
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className={styles.thumbnail}
                priority
              />
            </div>
          )}

          {/* Meta */}
          <div className={styles.meta}>
            {article.publishedAt && (
              <span className={styles.date}>
                🕐 {formatDate(article.publishedAt, true)}
              </span>
            )}
            {(article as unknown as { author?: { name: string } }).author && (
              <span className={styles.author}>
                ✍️ {(article as unknown as { author: { name: string } }).author.name}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className={styles.title}>{article.title}</h1>

          {/* Content */}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
    </div>
  );
}
