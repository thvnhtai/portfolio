import { render, screen } from '@testing-library/react';
import { LeetCode } from './LeetCode';
import { Providers, mockReducedMotion } from '../../test-utils';

const SAMPLE = {
  fetchedAt: '2026-10-22T00:00:00Z', username: 'thvnhtai', total: 564, easy: 176, medium: 306, hard: 82,
  allEasy: 972, allMedium: 2000, allHard: 900, ranking: 167654, streak: 36, activeDays: 133, contestRating: 1500,
  calendar: { [String(Math.floor(Date.now() / 86400000) * 86400)]: 4 },
};

afterEach(() => vi.restoreAllMocks());

test('renders without NaN when stats are partial and hides contest', async () => {
  mockReducedMotion(true);
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ ...SAMPLE, calendar: {}, contestRating: null, ranking: null })));
  render(<Providers><LeetCode /></Providers>);
  await screen.findByText(/thvnhtai/);
  expect(document.body.textContent).not.toMatch(/NaN|undefined/);
  expect(screen.queryByText(/contest/i)).toBeNull();
  expect(screen.getByText('564')).toBeInTheDocument();
});
test('shows contest when present, final values under reduced motion', async () => {
  mockReducedMotion(true);
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(SAMPLE)));
  render(<Providers><LeetCode /></Providers>);
  expect(await screen.findByText(/contest/i)).toBeInTheDocument();
  expect(screen.getByText('1500')).toBeInTheDocument();
});
test('fetch failure shows the fallback card', async () => {
  vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('x'));
  render(<Providers><LeetCode /></Providers>);
  expect(await screen.findByText(/Stats unavailable/)).toBeInTheDocument();
});
test('invalid JSON shape is treated as failure', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ total: 'x' })));
  render(<Providers><LeetCode /></Providers>);
  expect(await screen.findByText(/Stats unavailable/)).toBeInTheDocument();
});
