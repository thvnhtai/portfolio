import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test, vi } from 'vitest';
import { Providers, mockReducedMotion } from '../../test-utils';
import { NowLearning } from './NowLearning';

afterEach(() => { vi.useRealTimers(); mockReducedMotion(false); });

test('arrow keys move between tabs and show the panel', async () => {
  render(<Providers><NowLearning /></Providers>);
  const tabs = screen.getAllByRole('tab'); tabs[0]!.focus();
  await userEvent.keyboard('{ArrowRight}');
  expect(screen.getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true');
  await waitFor(() => expect(screen.getByRole('tabpanel')).toHaveTextContent(/I wrote Go services/));
});
test('panel shows progress, takeaway and concept links; no percentages', async () => {
  render(<Providers><NowLearning /></Providers>);
  const panel = () => screen.getByRole('tabpanel');
  expect(panel()).toHaveTextContent(/Vol\. 1 · 16 chapters/);
  expect(panel()).toHaveTextContent(/runs exactly once/);
  expect(within(panel()).getAllByText(/— done/).length).toBeGreaterThanOrEqual(16);
  expect(document.body.textContent).not.toMatch(/\d+\s?%/);
  await userEvent.click(screen.getAllByRole('tab')[2]!);
  await waitFor(() => expect(panel()).toHaveTextContent(/Rebuilt by hand/));
  expect(within(panel()).getByRole('link', { name: /Keyset pagination/ })).toHaveAttribute('href', '#/work/zen-ledger-portal');
});
test('a concept link opens its case study', async () => {
  window.history.replaceState(null, '', '/');
  render(<Providers><NowLearning /></Providers>);
  await userEvent.click(screen.getByRole('link', { name: /Run exactly once/ }));
  expect(window.location.hash).toBe('#/work/invoicing-portal');
  window.history.replaceState(null, '', '/');
});
test('roving tabindex, wrap, Home/End, heading, url is not a link', async () => {
  render(<Providers><NowLearning /></Providers>);
  expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  const tabs = () => screen.getAllByRole('tab');
  expect(tabs().map((t) => t.tabIndex)).toEqual([0, -1, -1]);
  tabs()[0]!.focus();
  await userEvent.keyboard('{ArrowLeft}');
  expect(tabs()[2]).toHaveAttribute('aria-selected', 'true');
  expect(tabs()[2]).toHaveFocus();
  await userEvent.keyboard('{Home}');
  expect(tabs()[0]).toHaveAttribute('aria-selected', 'true');
  await userEvent.keyboard('{End}');
  expect(tabs()[2]).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByText(/^~\/notes\//).closest('a')).toBeNull();
});
test('panel swaps after 0.6s; rapid switches cancel the previous', () => {
  vi.useFakeTimers();
  render(<Providers><NowLearning /></Providers>);
  const [, b, c] = screen.getAllByRole('tab');
  act(() => { b!.click(); });
  act(() => { vi.advanceTimersByTime(300); c!.click(); });
  act(() => { vi.advanceTimersByTime(400); }); // t=700
  expect(screen.getByRole('tabpanel')).not.toHaveTextContent(/I wrote Go services/);
  expect(screen.getByRole('tabpanel')).not.toHaveTextContent(/replication, partitioning/);
  act(() => { vi.advanceTimersByTime(300); }); // t=1000
  expect(screen.getByRole('tabpanel')).toHaveTextContent(/replication, partitioning/);
});
test('reduced motion swaps instantly', () => {
  mockReducedMotion(true);
  render(<Providers><NowLearning /></Providers>);
  act(() => { screen.getAllByRole('tab')[1]!.click(); });
  expect(screen.getByRole('tabpanel')).toHaveTextContent(/I wrote Go services/);
});
