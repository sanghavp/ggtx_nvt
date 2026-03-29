import { Metadata } from 'next';
import Link from 'next/link';
import { Milestone } from '@/lib/db/models';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Cột mốc lịch sử | Admin',
};

export default async function AdminMilestonesPage() {
  const milestones = await Milestone.findAll({
    order: [['sortOrder', 'ASC'], ['year', 'ASC']],
  });
  
  const list = milestones.map((m) => m.toJSON());

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Cột Mốc Lịch Sử</h1>
          <p className={styles.subtitle}>Quản lý các sự kiện hiển thị trên trang Giới Thiệu.</p>
        </div>
        <Link href="/admin/milestones/create" className={styles.createBtn}>
          + Thêm cột mốc mới
        </Link>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Năm</th>
              <th style={{ width: '25%' }}>Sự kiện</th>
              <th style={{ width: '40%' }}>Mô tả</th>
              <th style={{ width: '10%' }}>Thứ tự</th>
              <th align="right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((m: any) => (
                <tr key={m.id}>
                  <td><div className={styles.yearBadge}>{m.year}</div></td>
                  <td className={styles.fwMedium}>{m.title}</td>
                  <td className={styles.textMuted}>{m.description}</td>
                  <td>{m.sortOrder}</td>
                  <td align="right">
                    <div className={styles.actions}>
                      <Link href={`/admin/milestones/${m.id}/edit`} className={styles.actionBtn}>
                        ✏️ Sửa
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={styles.emptyRow}>
                  Chưa có cột mốc nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
