import { render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';
import { Providers } from '../../test-utils';

// pretend the desktop+motion media query matches so the pinned branch runs
vi.mock('../../lib/gsap', () => ({
  gsap: { matchMedia: () => ({ add: (_q: string, fn: () => void) => { fn(); }, revert: () => {} }) },
  ScrollTrigger: { create: () => ({}), refresh: () => {} },
}));
import { Timeline } from './Timeline';

test('pinned: visual stage is aria-hidden, sr-only list exposes every year and the job buttons', () => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }) as never;
  const { container } = render(<Providers><Timeline /></Providers>);
  expect(container.querySelector('[aria-hidden="true"][class*="ev"]')).toBeTruthy();
  const list = screen.getByTestId('timeline-sr');
  expect(within(list).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(['2022', '2023', '2024', '2025', '2026']);
  expect(within(list).getByRole('button', { name: /TMA Solutions/ })).toBeInTheDocument();
  // the only buttons reachable by AT are the sr-only ones
  expect(screen.getAllByRole('button', { name: /TMA Solutions/ })).toHaveLength(1);
});
