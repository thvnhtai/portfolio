import { useLang } from '../../i18n/LangProvider';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useInView } from '../../hooks/useInView';
import { SKILLS } from '../../content/skills';
import type { Skill } from '../../content/types';
import s from './Skills.module.css';

type G = Skill['group'];
const COLOR: Record<G, string> = { fe: '#ff4d00', ar: '#6d28d9', be: '#0891b2', dv: '#16a34a', qa: '#eab308', ai: '#ec4899' };
const GROUPS = Object.keys(COLOR) as G[];
const ROWS: { groups: G[]; cls: string }[] = [
  { groups: ['fe'], cls: '' },
  { groups: ['be', 'ar'], cls: s.r ?? '' },
  { groups: ['dv', 'qa', 'ai'], cls: s.s ?? '' },
];

export function Skills() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>();
  const chips = (list: Skill[], k: string) =>
    list.map((sk) => (
      <span key={k + sk.name} data-chip className={s.chip} style={{ '--c': COLOR[sk.group] } as React.CSSProperties}>
        <i />{sk.name}
      </span>
    ));
  return (
    <div className={s.root}>
      <h2 data-gravity className={s.title} data-i18n>{t.skills.title}</h2>
      <div ref={ref} className={`${s.rows} ${reduce ? s.still : ''} ${inView ? '' : s.paused}`}>
        {ROWS.map(({ groups, cls }) => {
          const list = SKILLS.filter((x) => groups.includes(x.group));
          return (
            <div key={groups.join()} data-row aria-hidden="true" className={`${s.row} ${cls}`}>
              {chips(list, 'a')}
              {!reduce && chips(list, 'b')}
            </div>
          );
        })}
      </div>
      <ul className={s.sr} aria-label={t.skills.listLabel} data-i18n>
        {GROUPS.map((g) => (
          <li key={g}>{t.skills.groups[g]}
            <ul>{SKILLS.filter((x) => x.group === g).map((x) => <li key={x.name}>{x.name}</li>)}</ul>
          </li>
        ))}
      </ul>
      <div className={s.legend} aria-hidden="true">
        {GROUPS.map((g) => (
          <span key={g} data-i18n><b style={{ background: COLOR[g] }} />{t.skills.groups[g]}</span>
        ))}
      </div>
    </div>
  );
}
