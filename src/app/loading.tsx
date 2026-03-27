import styles from '../(public)/page.module.css';

export default function HomeLoading() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero skeleton */}
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="skeleton skeleton-dark" style={{ width: 180, height: 24, borderRadius: 20, margin: '0 auto 1.5rem' }} />
          <div className="skeleton skeleton-dark" style={{ width: 400, height: 48, borderRadius: 8, margin: '0 auto 1rem' }} />
          <div className="skeleton skeleton-dark" style={{ width: 300, height: 20, borderRadius: 6, margin: '0 auto 2rem' }} />
          <div className="skeleton skeleton-dark" style={{ width: 160, height: 48, borderRadius: 12, margin: '0 auto' }} />
        </div>
      </div>

      {/* Stats skeleton */}
      <div style={{ padding: '3rem 1.5rem', background: 'var(--color-bg-alt)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ padding: '2rem', background: '#fff', borderRadius: 12, textAlign: 'center' }}>
              <div className="skeleton" style={{ width: 48, height: 48, borderRadius: '50%', margin: '0 auto 0.75rem' }} />
              <div className="skeleton" style={{ width: 60, height: 28, borderRadius: 6, margin: '0 auto 0.5rem' }} />
              <div className="skeleton" style={{ width: 80, height: 14, borderRadius: 4, margin: '0 auto' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
