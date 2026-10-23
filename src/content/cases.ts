import type { CaseBase } from './types';

export const CASES: readonly CaseBase[] = [
  { slug: 'zen-ledger-portal', name: 'Zen Ledger Portal', color: '#ff4d00', fg: '#111111', mock: 'ledger', url: 'zen-ledger.internal/transactions',
    arch: ['React UI', 'WebSocket', 'Go service', 'gRPC', 'MySQL · Redis'],
    stack: ['React', 'TypeScript', 'Go', 'gRPC', 'WebSocket', 'MySQL', 'Redis', 'Kubernetes', 'CI/CD'], city: { a: 2, b: 2, h: 120 } },
  { slug: 'invoicing-portal', name: 'Invoicing Portal', color: '#111111', fg: '#f2efe8', mock: 'invoice', url: 'invoicing.internal/billing-rules',
    arch: ['MFE host', 'Invoicing MFE', 'Go API', 'OIDC service', 'MySQL'],
    stack: ['Go', 'MySQL', 'React', 'TypeScript', 'Superset', 'Kibana', 'Datadog'], city: { a: 6, b: 2, h: 85 } },
  { slug: 'universal-config-management', name: 'Universal Config Management', color: '#6d28d9', fg: '#f2efe8', mock: 'diff', url: 'ucm.internal/requests/4821',
    arch: ['React UI', 'TanStack Query', 'Zod validation', 'Platform API', 'Pipeline'],
    stack: ['React', 'TypeScript', 'Ant Design', 'TanStack Query', 'Zod', 'Jest', 'RTL'], city: { a: 2, b: 6, h: 95 } },
  { slug: 'voucher-dashboard', name: 'Voucher Management Dashboard', color: '#0891b2', fg: '#111111', mock: 'voucher', url: 'vouchers.admin/dashboard',
    arch: ['Next.js', 'Material UI', 'Tailwind', 'REST API'],
    stack: ['Next.js', 'React', 'Material UI', 'Tailwind CSS'], city: { a: 6, b: 6, h: 62 } },
  { slug: 'cloud-native-ecommerce', name: 'Cloud-Native E-Commerce', color: '#16a34a', fg: '#111111', mock: 'mfe', url: 'shop.demo/checkout',
    arch: ['Shell (Nx)', 'Remote MFEs', '.NET services', 'RabbitMQ · gRPC', 'AWS EKS'],
    stack: ['React', 'Nx', 'Module Federation', '.NET', 'RabbitMQ', 'MassTransit', 'gRPC', 'Terraform', 'AWS'],
    repo: 'https://github.com/sloweyyy/cloud-native-ecommerce-platform', city: { a: 9, b: 2, h: 140 } },
];
