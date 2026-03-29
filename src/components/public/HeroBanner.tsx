import Image from 'next/image';
import styles from './HeroBanner.module.css';

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroBanner({
  title = 'Trung tâm GDNN-GDTX Nguyễn Văn Tố',
  subtitle = 'Nơi ươm mầm tri thức - Vững bước tương lai',
  ctaText = 'Tìm hiểu thêm',
  ctaLink = '/gioi-thieu',
}: HeroBannerProps) {
  return (
    <section className={styles.hero} id="hero-banner">
      {/* Background decorations */}
      <div className={styles.bgDecor}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.circle3} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>🎓 Giáo dục Nghề nghiệp - Giáo dục Thường xuyên</div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>

          <div className={styles.stats}>
            <div className={styles.avatarGroup}>
              <div className={styles.avatar}>👨‍🎓</div>
              <div className={styles.avatar}>👩‍🎓</div>
              <div className={styles.avatar}>👨‍🏫</div>
            </div>
            <span className={styles.statsText}>500+ học viên đang theo học</span>
          </div>

          <a href={ctaLink} className={styles.cta}>
            {ctaText}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/images/logo-v2.png"
            alt="Logo Trung tâm GDNN-GDTX Nguyễn Văn Tố"
            width={320}
            height={320}
            className={styles.heroImage}
            priority
          />
        </div>
      </div>
    </section>
  );
}
