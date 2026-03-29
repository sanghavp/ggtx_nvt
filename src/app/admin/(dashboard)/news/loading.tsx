import styles from './page.module.css';

export default function AdminNewsLoading() {
  return (
    <div className={styles.container}>
      <header className={styles.header} style={{ marginBottom: '1.5rem' }}>
        <div>
          <div className="skeleton" style={{ width: 220, height: 32, borderRadius: 8, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: 320, height: 18, borderRadius: 6 }} />
        </div>
        <div className="skeleton" style={{ width: 140, height: 40, borderRadius: 8 }} />
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
            {[1,2,3,4,5].map(i => (
              <tr key={i}>
                <td><div className="skeleton" style={{ width: '80%', height: 18, borderRadius: 4 }} /></td>
                <td><div className="skeleton" style={{ width: 80, height: 16, borderRadius: 4 }} /></td>
                <td><div className="skeleton" style={{ width: 70, height: 24, borderRadius: 12 }} /></td>
                <td align="right"><div className="skeleton" style={{ width: 100, height: 24, borderRadius: 4, marginLeft: 'auto' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
