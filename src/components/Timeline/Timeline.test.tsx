import { render, screen, fireEvent } from '@testing-library/react';
import { Timeline, groupByYear } from './Timeline';
import { TIMELINE } from '../../content/timeline';
import { Providers, mockReducedMotion } from '../../test-utils';

test('groups events by year', () => {
  const g = groupByYear(TIMELINE);
  expect([...g.keys()]).toEqual([2022, 2023, 2024, 2025, 2026]);
  expect(g.get(2025)!.map((e) => e.id)).toEqual(['grab-intern', 'grab-swe']);
  expect(g.get(2026)!.map((e) => e.id)).toEqual(['toeic-sw', 'graduated', 'now']);
});

test('job card opens its case study', () => {
  mockReducedMotion(true);
  render(<Providers><Timeline /></Providers>);
  fireEvent.click(screen.getByRole('button', { name: /TMA Solutions/ }));
  expect(window.location.hash).toBe('#/work/voucher-dashboard');
});

test('reduced motion lists every year with its cards', () => {
  mockReducedMotion(true);
  const { container } = render(<Providers><Timeline /></Providers>);
  expect(container.querySelectorAll('[data-year]')).toHaveLength(5);
  expect(screen.getByText('Heads-down at UIT')).toBeInTheDocument();
});

test('section has an h2 and every year heading is in the DOM', () => {
  const { container } = render(<Providers><Timeline /></Providers>);
  expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  expect([...container.querySelectorAll('h3')].map((h) => h.textContent)).toEqual(['2022', '2023', '2024', '2025', '2026']);
});
