import { act, render, screen } from '@testing-library/react';
import { Providers } from '../../test-utils';
import { MockUi } from './MockUi';

afterEach(() => vi.useRealTimers());

test.each(['ledger', 'invoice', 'diff', 'voucher', 'mfe'] as const)('%s mock shows the recreated label', (kind) => {
  render(<Providers><MockUi kind={kind} url="x" /></Providers>);
  expect(screen.getByText(/Recreated interface with sample data/)).toBeInTheDocument();
});

test('ledger auto-refresh adds rows, capped at 7', () => {
  vi.useFakeTimers();
  render(<Providers><MockUi kind="ledger" url="x" /></Providers>);
  act(() => { vi.advanceTimersByTime(5000 * 12); });
  expect(screen.getAllByRole('row', { hidden: true }).length - 1).toBe(7);
});
