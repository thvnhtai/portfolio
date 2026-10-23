import type { HowStep } from './types';

// Commit messages and hashes stay English in both languages.
export const HOW_STEPS: HowStep[] = [
  { id: 'understand', hash: 'a1f3c2e', branch: 'main', commit: 'feat: talk to users, agree API contract', evidence: ['UCM', 'Zen Ledger'] },
  { id: 'design', hash: 'b7e91d0', branch: 'main', commit: 'docs: schema + service boundaries', evidence: ['Zen Ledger', 'E-Commerce'] },
  { id: 'build', hash: 'c42a8f1', branch: 'feature', commit: 'feat(ui,api): account workflows end to end', evidence: ['Zen Ledger', 'Invoicing', 'UCM', 'Voucher', 'E-Commerce'] },
  { id: 'test', hash: 'd9b0e37', branch: 'feature', commit: 'test: unit + integration + UAT', evidence: ['Zen Ledger', 'UCM'] },
  { id: 'ship', hash: 'e15c6a4', branch: 'main', commit: 'ci: build → image → deploy to k8s', merge: true, evidence: ['Zen Ledger', 'E-Commerce'] },
  { id: 'support', hash: 'f803b2c', branch: 'main', commit: 'fix: trace upstream data mismatch', evidence: ['Invoicing', 'Zen Ledger'] },
];
