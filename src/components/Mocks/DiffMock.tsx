import s from './Mocks.module.css';

const LINES: [string, string?][] = [['  timeout_ms: 3000'], ['- max_retries: 3', s.d!], ['+ max_retries: 5', s.a!],
  ['- feature.new_router: false', s.d!], ['+ feature.new_router: true', s.a!], ['  region: ap-southeast-1']];

export function DiffMock() {
  return (
    <div>
      <div className={s.head}><b>Request #4821 · payment-service config</b><span className={s.pill} style={{ background: '#fef3c7' }}>Pending approval</span></div>
      <div className={s.diff}>{LINES.map(([t, c]) => <div key={t} className={c}>{t}</div>)}</div>
      <div style={{ marginTop: 12 }}>
        <span className={s.btn} style={{ background: '#16a34a', color: '#fff' }}>✓ Approve</span>
        <span className={s.btn} style={{ background: '#dc2626', color: '#fff' }}>✕ Reject</span>
        <span style={{ fontSize: 11, opacity: .6 }}>Pipeline: ● build ● test ○ deploy</span>
      </div>
    </div>
  );
}
