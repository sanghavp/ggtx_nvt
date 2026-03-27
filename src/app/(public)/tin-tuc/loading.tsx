export default function NewsListLoading() {
  return (
    <section style={{ padding: 'var(--sp-16) 0', minHeight: '60vh' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-padding)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-12)' }}>
          <div className="skeleton" style={{ width: 200, height: 36, borderRadius: 8, margin: '0 auto 0.75rem' }} />
          <div className="skeleton" style={{ width: 350, height: 18, borderRadius: 6, margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
              <div className="skeleton" style={{ width: '100%', height: 200 }} />
              <div style={{ padding: '1.25rem' }}>
                <div className="skeleton" style={{ width: '90%', height: 20, borderRadius: 4, marginBottom: 12 }} />
                <div className="skeleton" style={{ width: '60%', height: 14, borderRadius: 4, marginBottom: 8 }} />
                <div className="skeleton" style={{ width: '40%', height: 12, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
