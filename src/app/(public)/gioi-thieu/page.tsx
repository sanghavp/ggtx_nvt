import { Metadata } from 'next';
import { SiteSetting, Milestone } from '@/lib/db/models';
import logger from '@/lib/logger';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: 'Tìm hiểu về Trung tâm GDNN-GDTX Nguyễn Văn Tố, lịch sử hình thành và phát triển.',
};

// Đảm bảo trang luôn fetch data mới nhất (không cache SSR)
export const dynamic = 'force-dynamic';

async function getAboutData() {
  try {
    const [settingsData, milestonesData] = await Promise.all([
      SiteSetting.findAll({ where: { type: 'about' } }),
      Milestone.findAll({ order: [['sortOrder', 'ASC'], ['year', 'ASC']] }),
    ]);

    const settings = settingsData.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    return {
      settings,
      milestones: milestonesData.map(m => m.toJSON()),
    };
  } catch (error) {
    logger.error({ error }, 'Failed to fetch about page data');
    return { settings: {}, milestones: [] };
  }
}

export default async function GioiThieuPage() {
  const { settings, milestones } = await getAboutData();

  const heroTitle = settings['about_hero_title'] || 'Giới thiệu về Trung tâm';
  const heroDesc = settings['about_hero_description'] || 'Nơi ươm mầm tri thức và chắp cánh ước mơ.';
  const rawHtml = settings['about_content'] || '<p>Đang cập nhật nội dung giới thiệu...</p>';
  // Thay &nbsp; thành khoảng trắng thường để trình duyệt ngắt dòng đúng giữa các từ
  const aboutHtml = rawHtml.replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ');

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{heroTitle}</h1>
            <p className={styles.heroDesc}>{heroDesc}</p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.contentLayout}>
            {/* Rich Text Content */}
            <div className={styles.mainContent}>
              <div 
                className={styles.richText}
                dangerouslySetInnerHTML={{ __html: aboutHtml }}
              />
            </div>

            {/* Timeline / Milestones */}
            <aside className={styles.sidebar}>
              <div className={styles.timelineBox}>
                <h3 className={styles.timelineTitle}>Cột mốc lịch sử</h3>
                
                {milestones.length > 0 ? (
                  <div className={styles.timeline}>
                    {milestones.map((milestone: { id: number; year: string; title: string; description: string | null }) => (
                      <div key={milestone.id} className={styles.timelineItem}>
                        <div className={styles.timelineYear}>{milestone.year}</div>
                        <div className={styles.timelineCard}>
                          <h4 className={styles.milestoneTitle}>{milestone.title}</h4>
                          {milestone.description && (
                            <p className={styles.milestoneDesc}>{milestone.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.emptyTimeline}>Chưa có thông tin cột mốc lịch sử.</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
