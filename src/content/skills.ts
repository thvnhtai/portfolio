import type { Skill } from './types';

// Source of truth: CV skills list (spec "Skills (from CV)"), plus Kubernetes (Grab / Zen Ledger deploys).
const g = (group: Skill['group'], names: string[]): Skill[] => names.map(name => ({ name, group }));

export const SKILLS: Skill[] = [
  ...g('fe', ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'TanStack Router', 'TanStack Query', 'Zustand', 'Zod', 'Ant Design', 'Storybook']),
  ...g('ar', ['Micro-frontends', 'Module Federation', 'Nx', 'Component libraries', 'REST/JSON', 'WebSocket']),
  ...g('be', ['Go', 'gRPC', 'MySQL', 'Redis']),
  ...g('dv', ['Webpack', 'Rspack', 'GitHub Actions', 'GitLab CI/CD', 'Docker', 'Kubernetes']),
  ...g('qa', ['Jest', 'React Testing Library', 'Unit / integration / E2E', 'Datadog']),
  ...g('ai', ['Claude Code', 'Cursor']),
];
