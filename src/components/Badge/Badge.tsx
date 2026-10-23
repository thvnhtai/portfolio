import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useLang } from '../../i18n/LangProvider';
import { BadgeFallback } from './BadgeFallback';
import s from './BadgeFallback.module.css';

let webgl: boolean | undefined;
/** Probes once and releases the probe context (browsers cap live contexts at ~16). */
export function supportsWebGL(): boolean {
  if (webgl !== undefined) return webgl;
  try {
    const c = document.createElement('canvas');
    const gl = (c.getContext('webgl2') || c.getContext('webgl')) as WebGLRenderingContext | null;
    webgl = !!gl;
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    webgl = false;
  }
  return webgl;
}

type Scene = { start(): void; stop(): void; dispose(): void };

function Live({ onFail }: { onFail: (v: boolean) => void }) {
  const { t } = useLang();
  const [ref, inView] = useInView<HTMLDivElement>();
  const scene = useRef<Scene | null>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let dead = false;
    void import('./BadgeScene').then(({ createBadgeScene }) => {
      if (dead) return;
      scene.current = createBadgeScene(host, { photoUrl: `${import.meta.env.BASE_URL}img/profile.jpg` });
      if (inViewRef.current) scene.current.start();
    }).catch(() => { if (!dead) onFail(true); });
    return () => { dead = true; scene.current?.dispose(); scene.current = null; };
  }, [ref, onFail]);
  const inViewRef = useRef(inView);
  inViewRef.current = inView;
  useEffect(() => {
    if (inView) scene.current?.start(); else scene.current?.stop();
  }, [inView]);
  return (
    <>
      <div ref={ref} style={{ position: 'absolute', inset: 0 }} />
      <p className={s.hint} data-i18n>{typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches ? t.hero.badgeHintTouch : t.hero.badgeHint}</p>
    </>
  );
}

export default function Badge() {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  if (reduce || failed || !supportsWebGL()) return <BadgeFallback />;
  return <Live onFail={setFailed} />;
}
