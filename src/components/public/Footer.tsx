import Link from 'next/link';
import styles from './Footer.module.css';

interface FooterProps {
  address?: string;
  phone?: string;
  email?: string;
}

export default function Footer({ address, phone, email }: FooterProps = {}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: About */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Trung tâm GDNN-GDTX</h3>
            <h4 className={styles.schoolName}>Nguyễn Văn Tố</h4>
            <p className={styles.description}>
              Nơi ươm mầm tri thức - Vững bước tương lai.
              Đào tạo nguồn nhân lực chất lượng cao cho xã hội.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Liên kết nhanh</h3>
            <nav className={styles.links}>
              <Link href="/" className={styles.link}>Trang chủ</Link>
              <Link href="/tin-tuc" className={styles.link}>Tin tức</Link>
              <Link href="/gioi-thieu" className={styles.link}>Giới thiệu</Link>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Liên hệ</h3>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span>{address || 'Địa chỉ trung tâm GDNN-GDTX Nguyễn Văn Tố - Hoàn Kiếm'}</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <span>{phone || '0123 456 789'}</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <span>{email || 'info@nvt.edu.vn'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Trung tâm GDNN-GDTX Nguyễn Văn Tố - Hoàn Kiếm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
