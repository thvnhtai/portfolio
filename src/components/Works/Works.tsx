import { useEffect, useRef, useState } from 'react';
import { CASES } from '../../content/cases';
import type { CaseSlug } from '../../content/types';
import { useLang } from '../../i18n/LangProvider';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useRoute } from '../../hooks/useRoute';
import { storeCaseOrigin } from '../../lib/route';
import { KineticText } from '../KineticText/KineticText';
import type { City } from './CityCanvas';
import s from './Works.module.css';

export function Works() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const { openCase } = useRoute();
  const [ref, inView] = useInView<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cityRef = useRef<City | null>(null);
  const [tip, setTip] = useState<{ name: string; x: number | null; y: number | null } | null>(null);
  const busy = useRef(false);
  const showTip = (slug: CaseSlug | null) => {
    if (!slug || busy.current) { setTip(null); return; }
    const a = cityRef.current?.anchor(slug);
    setTip({ name: CASES.find((c) => c.slug === slug)!.name, x: a?.x ?? null, y: a?.y ?? null });
  };
  const showTipRef = useRef(showTip);
  showTipRef.current = showTip;
  const openRef = useRef(openCase);
  openRef.current = openCase;
  const reduceRef = useRef(reduce);
  reduceRef.current = reduce;

  const pick = (slug: CaseSlug, legendCentre?: { x: number; y: number }) => {
    if (busy.current) return;
    busy.current = true;
    setTip(null);
    setTimeout(() => { busy.current = false; }, 1500);
    const city = cityRef.current;
    const origin = city?.origin(slug) ?? legendCentre;
    if (origin) storeCaseOrigin(origin);
    if (city && city.origin(slug) && !reduceRef.current) void city.zoomTo(slug).then(() => openRef.current(slug));
    else openRef.current(slug);
  };
  const pickRef = useRef(pick);
  pickRef.current = pick;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dead = false;
    let made: City | null = null;
    void import('./CityCanvas').then(({ createCity }) => {
      if (dead) return;
      made = createCity(canvas, { onHover: (slug) => showTipRef.current(slug), onPick: (slug) => pickRef.current(slug) }, { animate: !reduce });
      cityRef.current = made;
      if (inViewRef.current) made.start();
    });
    return () => { dead = true; made?.dispose(); cityRef.current = null; };
  }, [reduce]);

  const inViewRef = useRef(inView);
  inViewRef.current = inView;
  useEffect(() => {
    if (inView) cityRef.current?.start(); else cityRef.current?.stop();
  }, [inView, reduce]);

  return (
    <div className={s.works} ref={ref}>
      <KineticText as="h2" text={t.works.heading} className={s.heading} />
      <p className={s.intro} data-i18n>{t.works.intro}</p>
      <div className={s.stage}>
        <canvas ref={canvasRef} className={s.canvas} aria-hidden="true" />
        {tip && (
          <div className={s.tt} aria-hidden="true" style={tip.x == null ? { left: 18, bottom: 14 } : { left: tip.x, top: tip.y! }}>{tip.name}</div>
        )}
        <p className={s.tip} data-i18n>{t.works.tip}</p>
        <ul className={s.legend}>
          {CASES.map((c, i) => (
            <li key={c.slug}>
              <button
                type="button"
                data-gravity className={s.item}
                style={{ '--c': c.color } as React.CSSProperties}
                onMouseEnter={() => { cityRef.current?.highlight(c.slug); showTip(c.slug); }}
                onMouseLeave={() => { cityRef.current?.highlight(null); showTip(null); }}
                onFocus={() => { cityRef.current?.highlight(c.slug); showTip(c.slug); }}
                onBlur={() => { cityRef.current?.highlight(null); showTip(null); }}
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  pickRef.current(c.slug, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
                }}
              >
                <i aria-hidden="true" />
                <span aria-hidden="true">0{i + 1}</span>
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
