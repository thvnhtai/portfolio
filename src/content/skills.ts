import type { Skill } from './types';

// Source of truth: CV skills list (spec "Skills (from CV)"), plus Kubernetes (Grab / Zen Ledger deploys).
const g = (group: Skill['group'], names: string[]): Skill[] => names.map(name => ({ name, group }));

export const SKILLS: Skill[] = [
  ...g('fe', ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'TanStack Query', 'TanStack Router', 'TanStack Virtual', 'Zustand', 'Zod', 'Ant Design', 'Tailwind CSS', 'Storybook']),
  ...g('ar', ['Microservices', 'Micro-frontends', 'Module Federation', 'Nx']),
  ...g('be', ['Go', 'SQL', 'gRPC', 'REST APIs', 'MySQL', 'Redis', 'RabbitMQ']),
  ...g('dv', ['Docker', 'GitHub Actions', 'GitLab CI/CD', 'Webpack', 'AWS', 'Terraform', 'Kubernetes']),
  ...g('qa', ['Jest', 'React Testing Library', 'Go testing', 'Datadog', 'Kibana']),
  ...g('ai', ['Claude Code', 'Cursor']),
];
