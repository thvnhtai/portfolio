import { render, screen } from '@testing-library/react';
import { HowIWork } from './HowIWork';
import { Providers, mockReducedMotion } from '../../test-utils';

test('commit messages stay English in VI', () => {
  window.history.replaceState(null, '', '/portfolio/?lang=vi');
  render(<Providers><HowIWork /></Providers>);
  expect(screen.getByText('feat: talk to users, agree API contract')).toBeInTheDocument();
  expect(screen.getByText(/Bắt đầu từ chính người dùng/)).toBeInTheDocument();
  window.history.replaceState(null, '', '/portfolio/');
});

test('reduced motion shows every step lit', () => {
  mockReducedMotion(true);
  const { container } = render(<Providers><HowIWork /></Providers>);
  const rows = container.querySelectorAll('[data-row]');
  expect(rows).toHaveLength(6);
  rows.forEach((r) => expect(r).toHaveAttribute('data-on', 'true'));
  expect(screen.getByText('merge ✓')).toBeInTheDocument();
});

test('long descriptions render in full, untruncated', () => {
  window.history.replaceState(null, '', '/portfolio/?lang=vi');
  render(<Providers><HowIWork /></Providers>);
  expect(screen.getByText('Bắt đầu từ chính người dùng — Ops, tài chính, PM, designer. Chốt API contract với backend trước khi viết dòng UI đầu tiên.')).toBeInTheDocument();
  window.history.replaceState(null, '', '/portfolio/');
});
