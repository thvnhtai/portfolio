import s from './Mocks.module.css';

const LOGS = [['ERROR', '#dc2626', 'VCH-2291 redeem failed: expired', '10:42'], ['WARN', '#d97706', 'Campaign SUMMER25 near limit', '10:31'],
  ['ERROR', '#dc2626', 'VCH-1180 duplicate redemption', '09:58']] as const;

export function VoucherMock() {
  return (
    <div>
      <div className={s.stats4}>
        <div>Issued<b>12,480</b></div><div>Redeemed<b>8,215</b></div><div>Active<b>3,902</b></div>
        <div style={{ color: '#dc2626' }}>Errors (24h)<b>17</b></div>
      </div>
      <div className={s.filters}>
        {['Status: All ▾', 'Campaign ▾', 'Last 7 days ▾'].map((f) => <span key={f} className={`${s.btn} ${s.out}`}>{f}</span>)}
      </div>
      <table className={s.mt}>
        <tbody>{LOGS.map(([l, c, m, t]) => <tr key={m}><td style={{ color: c }}>{l}</td><td>{m}</td><td>{t}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
