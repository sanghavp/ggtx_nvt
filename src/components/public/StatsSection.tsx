'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './StatsSection.module.css';

interface StatItem {
  value: string;
  label: string;
  icon: string;
}

const defaultStats: StatItem[] = [
  { value: '500+', label: 'Học viên', icon: '🎓' },
  { value: '50+', label: 'Giảng viên', icon: '👨‍🏫' },
  { value: '20+', label: 'Năm hoạt động', icon: '🏫' },
  { value: '15+', label: 'Ngành đào tạo', icon: '📚' },
];

export default function StatsSection({ stats = defaultStats }: { stats?: StatItem[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.stats} id="stats-section">
      <div className={styles.container}>
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`${styles.statItem} ${isVisible ? styles.visible : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <span className={styles.icon}>{stat.icon}</span>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
