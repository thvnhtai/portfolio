import type { TimelineEvent } from './types';

export const TIMELINE: TimelineEvent[] = [
  { id: 'uit-start', year: 2022, kind: 'edu', dateLabel: { en: 'Sep 2022', vi: '09/2022' } },
  { id: 'uit-2023', year: 2023, kind: 'edu', dateLabel: { en: '2023', vi: '2023' } },
  { id: 'toeic-lr', year: 2024, kind: 'cert', dateLabel: { en: 'Sep 2024', vi: '09/2024' } },
  { id: 'tma', year: 2024, kind: 'work', caseSlug: 'voucher-dashboard', dateLabel: { en: 'Dec 2024 – Mar 2025', vi: '12/2024 – 03/2025' } },
  { id: 'grab-intern', year: 2025, kind: 'work', caseSlug: 'invoicing-portal', dateLabel: { en: 'Jul – Dec 2025', vi: '07 – 12/2025' } },
  { id: 'grab-swe', year: 2025, kind: 'work', caseSlug: 'zen-ledger-portal', dateLabel: { en: 'Dec 2025 – Jun 2026', vi: '12/2025 – 06/2026' } },
  { id: 'toeic-sw', year: 2026, kind: 'cert', dateLabel: { en: 'Jan 2026', vi: '01/2026' } },
  { id: 'graduated', year: 2026, kind: 'edu', dateLabel: { en: 'Mar 2026', vi: '03/2026' } },
  { id: 'now', year: 2026, kind: 'now', dateLabel: { en: 'Now', vi: 'Hiện tại' } },
];
