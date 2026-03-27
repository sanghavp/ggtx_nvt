import Link from 'next/link';
import { News } from '@/lib/db/models';
import styles from './page.module.css';

export default async function AdminNewsPage() {
  const rawNews = await News.findAll({
    order: [['createdAt', 'DESC']],
    attributes: ['id', 'title', 'slug', 'isPublished', 'publishedAt', 'createdAt'],
  });
  
  // Convert sang plain object để deserialize an toàn trong component
  const newsList = rawNews.map((n) => n.toJSON());

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Quản lý Tin Tức</h1>
          <p className={styles.subtitle}>Thêm, sửa, xóa các bài đăng tin tức của trường.</p>
        </div>
        <Link href="/admin/news/create" className={styles.createBtn}>
          + Viết bài mới
        </Link>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '45%' }}>Tiêu đề</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th align="right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {newsList.length > 0 ? (
              newsList.map((article: any) => (
                <tr key={article.id}>
                  <td>
                    <div className={styles.articleTitle}>{article.title}</div>
                  </td>
                  <td>
                    {new Date(article.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td>
                    {article.isPublished ? (
                      <span className={`${styles.badge} ${styles.badgeSuccess}`}>Đã xuất bản</span>
                    ) : (
                      <span className={`${styles.badge} ${styles.badgeDraft}`}>Bản nháp</span>
                    )}
                  </td>
                  <td align="right">
                    <div className={styles.actions}>
                      <Link href={`/tin-tuc/${article.slug}`} target="_blank" className={styles.actionBtn}>
                        👁️ Xem
                      </Link>
                      <Link href={`/admin/news/${article.id}/edit`} className={styles.actionBtn}>
                        ✏️ Sửa
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={styles.emptyRow}>
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>📝</span>
                    <p className={styles.emptyTitle}>Chưa có bài viết nào</p>
                    <p className={styles.emptyDesc}>Bắt đầu bằng cách tạo bài viết đầu tiên cho trường.</p>
                    <Link href="/admin/news/create" className={styles.createBtn}>+ Viết bài mới</Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
