import Image from 'next/image';
import Link from 'next/link';
import { formatDate, truncateText } from '@/lib/utils';
import styles from './NewsCard.module.css';

interface NewsCardProps {
  title: string;
  slug: string;
  thumbnail: string | null;
  summary: string | null;
  publishedAt: Date | string | null;
}

export default function NewsCard({ title, slug, thumbnail, summary, publishedAt }: NewsCardProps) {
  return (
    <Link href={`/tin-tuc/${slug}`} className={styles.card} id={`news-card-${slug}`}>
      <div className={styles.imageWrapper}>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>📰</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{truncateText(title, 80)}</h3>
        {summary && (
          <p className={styles.summary}>{truncateText(summary, 120)}</p>
        )}
        {publishedAt && (
          <div className={styles.meta}>
            <span className={styles.date}>🕐 {formatDate(publishedAt)}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
