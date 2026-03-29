import { Metadata } from 'next';
import HeroBanner from '@/components/public/HeroBanner';
import StatsSection from '@/components/public/StatsSection';
import NewsCard from '@/components/public/NewsCard';
import Link from 'next/link';
import { News, User } from '@/lib/db/models';
import logger from '@/lib/logger';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Trang chủ | Trung tâm GDNN-GDTX Nguyễn Văn Tố - Hoàn Kiếm',
};

export const dynamic = 'force-dynamic';

async function getLatestNews() {
  try {
    const articles = await News.findAll({
      where: { isPublished: true },
      include: [{ model: User, as: 'author', attributes: ['id', 'name'] }],
      order: [['publishedAt', 'DESC']],
      limit: 3,
      attributes: ['id', 'title', 'slug', 'thumbnail', 'summary', 'publishedAt'],
    });
    return articles.map((a) => a.toJSON());
  } catch (error) {
    logger.warn({ error }, 'Failed to fetch latest news for homepage, using empty list');
    return [];
  }
}

export default async function Home() {
  const latestNews = await getLatestNews();

  return (
    <>
      <HeroBanner />
      <StatsSection />

      {/* News Highlights */}
      <section className={styles.newsSection} id="news-highlights">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Tin tức nổi bật</h2>

          {latestNews.length > 0 ? (
            <div className={styles.newsGrid}>
              {latestNews.map((news: { id: number; title: string; slug: string; thumbnail: string | null; summary: string | null; publishedAt: Date | string | null }) => (
                <NewsCard
                  key={news.id}
                  title={news.title}
                  slug={news.slug}
                  thumbnail={news.thumbnail}
                  summary={news.summary}
                  publishedAt={news.publishedAt}
                />
              ))}
            </div>
          ) : (
            <p className={styles.emptyText}>Chưa có tin tức mới. Tin tức sẽ được cập nhật sớm.</p>
          )}

          <div className={styles.viewAll}>
            <Link href="/tin-tuc" className={styles.viewAllLink}>
              Xem tất cả tin tức
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
