import Link from 'next/link';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  const delta = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <nav className={styles.pagination} aria-label="Phân trang" id="pagination">
      {currentPage > 1 && (
        <Link href={`${basePath}?page=${currentPage - 1}`} className={styles.arrow} aria-label="Trang trước">
          ←
        </Link>
      )}

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={`dots-${index}`} className={styles.dots}>…</span>
        ) : (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`${styles.page} ${page === currentPage ? styles.active : ''}`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link href={`${basePath}?page=${currentPage + 1}`} className={styles.arrow} aria-label="Trang sau">
          →
        </Link>
      )}
    </nav>
  );
}
