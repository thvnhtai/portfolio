export type Lang = 'en' | 'vi';
export type CaseSlug = 'zen-ledger-portal' | 'invoicing-portal' | 'universal-config-management' | 'voucher-dashboard' | 'cloud-native-ecommerce';
export type SectionId = 'hero' | 'work' | 'how' | 'career' | 'skills' | 'leetcode' | 'learning' | 'contact';

export type CaseBase = {
  slug: CaseSlug; name: string; color: string; fg: string;
  mock: 'ledger' | 'invoice' | 'diff' | 'voucher' | 'mfe';
  url: string; arch: string[]; stack: string[]; repo?: string;
  city: { a: number; b: number; h: number };
};
export type CaseCopy = {
  roleLine: string; lead: string; meta: [label: string, value: string][];
  problem: string; approach: string; built: [title: string, body: string][];
  archNote: string; outcomes: [title: string, body: string][]; learned: string[];
};

export type Skill = { name: string; group: 'fe' | 'ar' | 'be' | 'dv' | 'qa' | 'ai' };
export type TimelineEvent = {
  id: 'uit-start' | 'uit-2023' | 'toeic-lr' | 'tma' | 'grab-intern' | 'grab-swe' | 'toeic-sw' | 'graduated' | 'now';
  year: 2022 | 2023 | 2024 | 2025 | 2026; dateLabel: Record<Lang, string>;
  caseSlug?: CaseSlug; kind: 'edu' | 'cert' | 'work' | 'now';
};
export type HowStep = {
  id: 'understand' | 'design' | 'build' | 'test' | 'ship' | 'support';
  hash: string; branch: 'main' | 'feature'; commit: string; merge?: boolean; evidence: string[];
};

export type LearningTopic = {
  id: 'system-design' | 'go' | 'ddia'; tab: string; by: string; url: string; why: string;
  learned: string[] | null; where: string | null; takeaway: string | null;
};

export type Copy = {
  nav: { work: string; contact: string; openPalette: string; language: string; main: string };
  hero: { bio: string; cv: string; touch: string; based: string; city: string; prev: string; edu: string; eduValue: string; status: string; open: string; badgeHint: string; badgeHintTouch: string };
  works: { heading: string; intro: string; tip: string };
  caseUi: { case: string; back: string; product: string; note: string; problem: string; problemH: string; approach: string; approachH: string; built: string; builtH: string; arch: string; archH: string; outcome: string; outcomeH: string; stack: string; learned: string; next: string; repo: string };
  cases: Record<CaseSlug, CaseCopy>;
  how: { kicker: string; title: string; note: string; steps: Record<HowStep['id'], { title: string; body: string }> };
  timeline: { kicker: string; cards: Record<TimelineEvent['id'], { title: string; sub: string; body: string }> };
  skills: { title: string; listLabel: string; groups: Record<Skill['group'], string> };
  leetcode: { kicker: string; solved: string; ranking: string; streak: string; activeDays: string; lastYear: string; contest: string; easy: string; medium: string; hard: string; of: string; profile: string; unavailable: string };
  learning: { title: string; placeholders: { learned: string; where: string; takeaway: string }; topics: LearningTopic[] };
  contact: { kicker: string; prompt: string; hint: string; nowIn: string; awake: string; asleep: string };
  palette: { placeholder: string; empty: string; groups: { navigate: string; projects: string; actions: string; links: string }; copyEmail: string; downloadCv: string; switchLang: string; sections: Record<SectionId, string>; footer: { move: string; select: string; close: string } };
  preloader: { greeting: string; skipHint: string };
  toast: { copied: string; copyFailed: string; gravity: string };
  meta: { title: string; description: string };
};
