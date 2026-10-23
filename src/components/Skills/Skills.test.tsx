import { render, screen, within } from '@testing-library/react';
import { Skills } from './Skills';
import { SKILLS } from '../../content/skills';
import { Providers, mockReducedMotion } from '../../test-utils';

test('every CV skill is listed once for assistive tech, no percentages', () => {
  render(<Providers><Skills /></Providers>);
  const list = screen.getByRole('list', { name: /skills/i });
  const inner = within(list).getAllByRole('list');
  expect(inner.flatMap((u) => within(u).getAllByRole('listitem'))).toHaveLength(SKILLS.length);
  expect(within(list).getAllByRole('listitem', { hidden: false }).filter((li) => !li.querySelector('ul'))).toHaveLength(SKILLS.length);
  expect(document.body.textContent).not.toMatch(/\d+\s?%/);
});

test('marquee rows are aria-hidden and doubled; reduced motion renders one copy', () => {
  mockReducedMotion(false);
  const { container, unmount } = render(<Providers><Skills /></Providers>);
  const rows = container.querySelectorAll('[data-row]');
  expect(rows).toHaveLength(3);
  rows.forEach((r) => expect(r).toHaveAttribute('aria-hidden', 'true'));
  const n = container.querySelectorAll('[data-chip]').length;
  expect(n).toBe(SKILLS.length * 2);
  unmount();
  mockReducedMotion(true);
  const r2 = render(<Providers><Skills /></Providers>);
  expect(r2.container.querySelectorAll('[data-chip]')).toHaveLength(SKILLS.length);
});

test('VI title is translated', () => {
  window.history.pushState({}, '', '/?lang=vi');
  render(<Providers><Skills /></Providers>);
  expect(screen.getByRole('heading', { name: 'Bộ công cụ.' })).toBeInTheDocument();
  window.history.pushState({}, '', '/');
});
