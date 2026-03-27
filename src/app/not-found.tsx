import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.illustration}>
          <span className={styles.code}>404</span>
          <div className={styles.glow}></div>
        </div>
        <h1 className={styles.title}>Trang không tồn tại</h1>
        <p className={styles.description}>
          Xin lỗi, trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển sang địa chỉ khác.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.homeBtn}>
            ← Về Trang Chủ
          </Link>
          <Link href="/tin-tuc" className={styles.newsBtn}>
            Xem Tin Tức
          </Link>
        </div>
      </div>
    </div>
  );
}
