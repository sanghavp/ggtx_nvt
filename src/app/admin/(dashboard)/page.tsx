import { Metadata } from 'next';
import { auth } from "@/auth";
import { SiteSetting, News, Milestone } from '@/lib/db/models';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Tổng quan',
};

async function getStats() {
  try {
    const [newsCount, milestoneCount] = await Promise.all([
      News.count(),
      Milestone.count(),
    ]);

    return { newsCount, milestoneCount };
  } catch (error) {
    return { newsCount: 0, milestoneCount: 0 };
  }
}

export default async function AdminDashboardPage() {
  const session = await auth();
  const { newsCount, milestoneCount } = await getStats();

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tổng quan hệ thống</h1>
        <p className={styles.subtitle}>Theo dõi các chỉ số và hoạt động của Website</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📰</div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Tin tức / Bài viết</h3>
            <p className={styles.statValue}>{newsCount}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⏳</div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Cột mốc lịch sử</h3>
            <p className={styles.statValue}>{milestoneCount}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⚙️</div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Cấu hình Website</h3>
            <p className={styles.statValue}>Hoạt động</p>
          </div>
        </div>
      </div>

      <div className={styles.recentSection}>
        <h2 className={styles.sectionTitle}>Hướng dẫn nhanh</h2>
        <div className={styles.guideCard}>
          <ul className={styles.guideList}>
            <li>Sử dụng menu bên trái để truy cập các tính năng.</li>
            <li><strong>Tin tức:</strong> Thêm, sửa, xóa các bài đăng hiển thị trên trang chủ và trang Tin tức.</li>
            <li><strong>Cài đặt:</strong> Chỉnh sửa nội dung Giới thiệu, Hero Banner và Thống kê trang chủ.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
