import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import s from './ArchDiagram.module.css';

const NARROW = '(max-width: 720px)';
const BH = 56;

function useNarrow() {
  const mq = () => (typeof window.matchMedia === 'function' ? window.matchMedia(NARROW) : null);
  const [narrow, setNarrow] = useState(() => !!mq()?.matches);
  useEffect(() => {
    const m = mq();
    if (!m?.addEventListener) return;
    const on = () => setNarrow(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return narrow;
}

export function ArchDiagram({ nodes, note, color }: { nodes: string[]; note: string; color: string }) {
  const reduce = useReducedMotion();
  const narrow = useNarrow();
  const [ref, inView] = useInView<HTMLDivElement>();
  const animate = inView && !reduce;
  const n = nodes.length;
  // horizontal: wide row; vertical (phones): stacked so labels stay ~14px
  const bw = narrow ? 260 : 150;
  const gap = narrow ? 44 : n > 1 ? (900 - n * bw) / (n - 1) : 0;
  const W = narrow ? bw : 900;
  const H = narrow ? n * BH + (n - 1) * gap : BH;
  const pad = 4;
  return (
    <div ref={ref}>
      <svg viewBox={`${-pad} ${-pad} ${W + 2 * pad} ${H + 2 * pad}`} role="img" aria-label={nodes.join(' → ')} width="100%" style={{ display: 'block', maxWidth: narrow ? 300 : undefined, margin: '0 auto' }} fontFamily="Inter Tight, Helvetica Neue, Arial" fontWeight={800}>
        {nodes.map((t, i) => {
          const x = narrow ? 0 : i * (bw + gap), y = narrow ? i * (BH + gap) : 0;
          const [x1, y1, x2, y2] = narrow ? [bw / 2, y + BH, bw / 2, y + BH + gap] : [x + bw, BH / 2, x + bw + gap, BH / 2];
          const fs = Math.min(14, (bw - 16) / (t.length * 0.62));
          return (
            <g key={t}>
              {i < n - 1 && (
                <>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#555" strokeWidth={2} strokeDasharray="6 6">
                    {animate && <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />}
                  </line>
                  {animate && (
                    <circle r={5} fill={color}>
                      <animateMotion dur={`${1.4 + i * 0.2}s`} repeatCount="indefinite" path={`M${x1},${y1} L${x2},${y2}`} />
                    </circle>
                  )}
                </>
              )}
              <rect x={x} y={y} width={bw} height={BH} rx={10} fill="#1d1d1d" stroke={i === 0 ? color : '#444'} strokeWidth={2} />
              <text x={x + bw / 2} y={y + BH / 2 + fs / 3} textAnchor="middle" fill="#f2efe8" fontSize={fs}>{t}</text>
            </g>
          );
        })}
      </svg>
      {note && <p className={s.note}>{note}</p>}
    </div>
  );
}
