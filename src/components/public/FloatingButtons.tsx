'use client';

import styles from './FloatingButtons.module.css';

export default function FloatingButtons() {
  // NOTE: Tạm thời ẩn các nút này đi theo yêu cầu, có thể mở lại sau này
  return null;

  /*
  return (
    <div className={styles.wrapper} id="floating-buttons">
      <a
        href="https://m.me/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.button} ${styles.messenger}`}
        aria-label="Liên hệ qua Messenger"
        title="Messenger"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.434 5.503 3.678 7.2V22l3.455-1.9a12.17 12.17 0 002.867.34c5.523 0 10-4.144 10-9.243S17.523 2 12 2zm.994 12.454l-2.55-2.72-4.976 2.72 5.473-5.81 2.613 2.72 4.912-2.72-5.472 5.81z" />
        </svg>
      </a>
      <a
        href="https://zalo.me/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.button} ${styles.zalo}`}
        aria-label="Liên hệ qua Zalo"
        title="Zalo"
      >
        <span className={styles.zaloText}>Zalo</span>
      </a>
    </div>
  );
  */
}
