import s from './Mocks.module.css';

const RULES = [['Commission tier A', '2025-09-01', 'Active', '#dcfce7'], ['Delivery fee rule', '2025-10-15', 'Scheduled', '#fef3c7'],
  ['Promo surcharge', '2025-08-01', 'Expired', '#e5e7eb'], ['Merchant rebate', '2025-11-01', 'Scheduled', '#fef3c7']] as const;

export function InvoiceMock() {
  return (
    <div>
      <div className={s.head}>
        <b>Billing Rule Schedules</b>
        <span><span className={s.btn} style={{ background: '#111', color: '#fff' }}>+ New schedule</span><span className={`${s.btn} ${s.out}`}>⇣ Bulk download BCR</span></span>
      </div>
      <table className={s.mt}>
        <thead><tr><th>RULE</th><th>EFFECTIVE</th><th>STATUS</th></tr></thead>
        <tbody>
          {RULES.map(([n, d, st, bg]) => (
            <tr key={n}><td>{n}</td><td>{d}</td><td><span className={s.pill} style={{ background: bg }}>{st}</span></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
