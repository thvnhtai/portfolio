import { act, render, screen, waitFor } from '@testing-library/react';
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
test('unfilled fields show placeholders, no percentages', () => {
  render(<Providers><NowLearning /></Providers>);
  expect(screen.getAllByText(/Tai fills in|e\.g\. chapter/).length).toBeGreaterThan(0);
  expect(document.body.textContent).not.toMatch(/\d+\s?%/);
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
  expect(screen.queryByRole('link')).toBeNull();
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
