export type LeetCodeStats = {
  fetchedAt: string; username: 'thvnhtai'; total: number; easy: number; medium: number; hard: number;
  allEasy: number; allMedium: number; allHard: number; ranking: number | null; streak: number;
  activeDays: number; contestRating: number | null; calendar: Record<string, number>;
};
export type HeatCell = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const DAY = 86400000;
const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const utcDay = (d: Date) => Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());

function byDate(calendar: Record<string, number>): Map<string, number> {
  const m = new Map<string, number>();
  for (const [k, v] of Object.entries(calendar)) {
    const s = Number(k);
    if (Number.isFinite(s) && Number.isFinite(v)) m.set(iso(s * 1000), (m.get(iso(s * 1000)) ?? 0) + v);
  }
  return m;
}

export function toHeatmap(calendar: Record<string, number>, today: Date): HeatCell[] {
  const t = utcDay(today);
  const start = t - new Date(t).getUTCDay() * DAY - 52 * 7 * DAY; // Sunday, 52 weeks before this week's Sunday
  const days = byDate(calendar);
  const cells: HeatCell[] = [];
  for (let i = 0; i < 53 * 7; i++) {
    const date = iso(start + i * DAY);
    cells.push({ date, count: start + i * DAY > t ? 0 : days.get(date) ?? 0, level: 0 });
  }
  const max = Math.max(0, ...cells.map((c) => c.count));
  for (const c of cells) if (c.count > 0) c.level = Math.min(4, Math.max(1, Math.ceil((c.count / max) * 4))) as HeatCell['level'];
  return cells;
}

export function ringFraction(solved: number, total: number): number {
  if (!(total > 0) || !Number.isFinite(solved)) return 0;
  return Math.min(1, Math.max(0, solved / total));
}

export function sumLastYear(calendar: Record<string, number>, today: Date): number {
  const t = utcDay(today);
  let n = 0;
  for (const [d, c] of byDate(calendar)) {
    const ms = Date.parse(d);
    if (ms <= t && ms > t - 365 * DAY) n += c;
  }
  return n;
}

const NUM_KEYS = ['total', 'easy', 'medium', 'hard', 'allEasy', 'allMedium', 'allHard', 'streak', 'activeDays'] as const;
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

/** Trust-boundary check for the fetched JSON; null = treat as a failed fetch. */
export function parseStats(raw: unknown): LeetCodeStats | null {
  const r = raw as Record<string, unknown> | null;
  if (!r || typeof r !== 'object') return null;
  if (!NUM_KEYS.every((k) => isNum(r[k]))) return null;
  if (r.ranking !== null && !isNum(r.ranking)) return null;
  if (r.contestRating !== null && !isNum(r.contestRating)) return null;
  const cal = r.calendar;
  if (!cal || typeof cal !== 'object' || Array.isArray(cal)) return null;
  return r as unknown as LeetCodeStats;
}
