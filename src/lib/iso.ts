import type { CaseSlug } from '../content/types';

export type IsoOrigin = { x: number; y: number; tw: number; th: number };
export type Box = { top: number; left: number; right: number; bottom: number; cx: number };

export const iso = (a: number, b: number, o: IsoOrigin) => ({ x: o.x + ((a - b) * o.tw) / 2, y: o.y + ((a + b) * o.th) / 2 });
export const isRoad = (a: number, b: number) => a === 4 || b === 4 || a === 8 || b === 8;

/** Screen bounds of a building footprint inset 0.14 with height h. */
export function buildingBox(a: number, b: number, h: number, o: IsoOrigin): Box {
  const i = 0.14;
  const N = iso(a + i, b + i, o), E = iso(a + 1 - i, b + i, o), S = iso(a + 1 - i, b + 1 - i, o), W = iso(a + i, b + 1 - i, o);
  return { top: Math.min(N.y, E.y, W.y) - h, left: W.x, right: E.x, bottom: S.y, cx: (N.x + S.x) / 2 };
}

/** Later entries are drawn on top, so they win. */
export function hitTest(boxes: { slug: CaseSlug; box: Box }[], x: number, y: number): CaseSlug | null {
  let hit: CaseSlug | null = null;
  for (const { slug, box: b } of boxes) if (x > b.left && x < b.right && y > b.top && y < b.bottom) hit = slug;
  return hit;
}
