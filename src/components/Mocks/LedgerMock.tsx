import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import s from './Mocks.module.css';

const TYPES = [['CREDIT', '#dcfce7'], ['DEBIT', '#fee2e2'], ['TRANSFER', '#e0e7ff'], ['REFUND', '#fef3c7']] as const;
const MAX = 7;
let seq = 0;
const pick = (n: number) => Math.floor(Math.random() * n);
const row = () => ({
  id: ++seq,
  tx: `TX-${100000 + pick(900000)}`,
  acc: `ACC-${10000 + pick(90000)}`,
  type: TYPES[pick(4)]!,
  status: Math.random() < 0.85 ? 'Settled' : 'Pending',
  amount: (10 + Math.random() * 9000).toFixed(2),
});
type Row = ReturnType<typeof row>;

export function LedgerMock() {
  const [rows, setRows] = useState<Row[]>(() => [row(), row(), row()]);
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setRows((r) => [row(), ...r].slice(0, MAX)), 1300);
    return () => clearInterval(id);
  }, [reduce, inView]);
  return (
    <div ref={ref}>
      <div className={s.head}><b>Transactions</b><span className={s.live}><i />LIVE · WebSocket</span></div>
      <table className={s.mt}>
        <thead><tr><th>ID</th><th>ACCOUNT</th><th>TYPE</th><th>STATUS</th><th className={s.r}>AMOUNT</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id} className={i === 0 && !reduce ? s.new : undefined}>
              <td>{r.tx}</td><td>{r.acc}</td>
              <td><span className={s.pill} style={{ background: r.type[1] }}>{r.type[0]}</span></td>
              <td>{r.status}</td><td className={s.r}>{r.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
