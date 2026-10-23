import { lockScroll } from '../../lib/scrollLock';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n/LangProvider';
import styles from './Preloader.module.css';

const STEP = 330; // ms per line; 9 lines ≈ 3 s
const SPLIT = 0.8 * 1000;
const LINES = [
  '$ git clone https://github.com/thvnhtai/portfolio',
  "Cloning into 'portfolio'...",
  'remote: Enumerating objects: done.',
  'Receiving objects: 100%',
  'Resolving deltas: 100%, done.',
  '$ cd portfolio && npm run hello',
  '',
];

export function Preloader({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [shown, setShown] = useState(0);
  const [split, setSplit] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      doneRef.current();
    };
    const total = (LINES.length + 2) * STEP; // + greeting line + hold
    for (let i = 1; i <= LINES.length + 1; i++) timers.push(setTimeout(() => setShown(i), i * STEP));
    timers.push(setTimeout(() => setSplit(true), total));
    timers.push(setTimeout(finish, total + SPLIT));
    const unlock = lockScroll();
    // capture + preventDefault: Escape must skip the preloader without also closing a deep-linked case underneath
    const onKey = (e: KeyboardEvent) => { if (!['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) { e.preventDefault(); finish(); } };
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('pointerdown', finish);
    return () => {
      finished = true;
      timers.forEach(clearTimeout);
      unlock();
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('pointerdown', finish);
    };
  }, []);

  const pct = Math.min(100, Math.round((shown / (LINES.length + 1)) * 100));
  const content = (
    <div className={styles.term}>
      {LINES.slice(0, shown).map((l, i) => <div key={i}>{l || ' '}</div>)}
      {shown > LINES.length && <div className={styles.accent}>▲ {t.preloader.greeting}</div>}
      <div className={styles.bar}><i style={{ width: `${pct}%` }} /></div>
      <div className={styles.hint}>{t.preloader.skipHint}</div>
    </div>
  );
  // ponytail: terminal is decorative (aria-hidden); the skip hint is visible text inside it, so SR users just get the site.
  return (
    <div className={styles.root} aria-hidden="true" data-testid="preloader">
      <div className={`${styles.half} ${styles.top} ${split ? styles.openTop : ''}`}>{content}</div>
      <div className={`${styles.half} ${styles.bottom} ${split ? styles.openBottom : ''}`}>
        <div className={styles.bottomInner}>{content}</div>
      </div>
    </div>
  );
}
