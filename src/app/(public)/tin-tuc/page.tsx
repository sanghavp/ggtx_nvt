import { Metadata } from 'next';
import NewsCard from '@/components/public/NewsCard';
import Pagination from '@/components/public/Pagination';
import { News, User } from '@/lib/db/models';
import logger from '@/lib/logger';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Tin tức',
  description: 'Tin tức mới nhất từ Trung tâm GDNN-GDTX Nguyễn Văn Tố - Hoàn Kiếm.',
};

// Lấy dữ liệu trực tiếp trên server (Server Component)
async function getNews(page: number, limit: number) {
  try {
    const offset = (page - 1) * limit;

    const { count, rows } = await News.findAndCountAll({
      where: { isPublished: true },
      include: [{ model: User, as: 'author', attributes: ['id', 'name'] }],
      order: [['publishedAt', 'DESC']],
      limit,
      offset,
      attributes: ['id', 'title', 'slug', 'thumbnail', 'summary', 'publishedAt'],
    });

    return {
      articles: rows.map((r) => r.toJSON()),
      total: count,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    logger.error({ error }, 'Failed to fetch news for page');
    return { articles: [], total: 0, totalPages: 0 };
  }
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function TinTucPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const page = Math.max(1, parseInt(resolvedParams.page || '1', 10));
  const limit = 9;
  const { articles, totalPages } = await getNews(page, limit);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Tin tức về NVT</h1>
        </div>
      </div>

      <div className={styles.container}>
        {articles.length > 0 ? (
          <>
            <div className={styles.grid}>
              {articles.map((article: { id: number; title: string; slug: string; thumbnail: string | null; summary: string | null; publishedAt: Date | string | null }) => (
                <NewsCard
                  key={article.id}
                  title={article.title}
                  slug={article.slug}
                  thumbnail={article.thumbnail}
                  summary={article.summary}
                  publishedAt={article.publishedAt}
                />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} basePath="/tin-tuc" />
          </>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>📰</span>
            <p className={styles.emptyText}>Chưa có tin tức nào.</p>
          </div>
        )}
      </div>
    </div>
  );
}
