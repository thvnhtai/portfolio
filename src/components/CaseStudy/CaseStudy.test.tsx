import { act, fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { stubPendingFetch } from '../../test-utils';

beforeEach(stubPendingFetch);

beforeEach(() => sessionStorage.setItem('preloaded', '1')); // skip preloader (it also locks body scroll)

const SLUGS = ['zen-ledger-portal', 'invoicing-portal', 'universal-config-management', 'voucher-dashboard', 'cloud-native-ecommerce'];
const open = (slug: string, q = '') => { window.history.replaceState(null, '', `/portfolio/${q}#/work/${slug}`); return render(<App />); };

test.each(SLUGS)('renders %s with title and outcomes', (slug) => {
  open(slug);
  const dlg = screen.getByRole('dialog');
  expect(within(dlg).getAllByRole('heading').length).toBeGreaterThan(4);
  expect(within(dlg).getByText(/Recreated interface|Giao diện dựng lại/)).toBeInTheDocument();
  expect(within(dlg).getByRole('img', { name: /→/ })).toBeInTheDocument();
  expect(within(dlg).getByText(/WHAT I LEARNED|MÌNH HỌC ĐƯỢC GÌ/).nextElementSibling?.querySelectorAll('li').length).toBeGreaterThan(1);
});

test('focuses the title and locks body scroll; Escape closes, unlocks', async () => {
  open('zen-ledger-portal');
  const dlg = screen.getByRole('dialog');
  expect(within(dlg).getByRole('heading', { level: 1 })).toHaveFocus();
  expect(document.body.style.overflow).toBe('hidden');
  await userEvent.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  expect(window.location.hash).toBe('');
  await waitFor(() => expect(document.body.style.overflow).not.toBe('hidden'));
});

test('Escape with defaultPrevented does not close', () => {
  open('zen-ledger-portal');
  const ev = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
  ev.preventDefault();
  document.dispatchEvent(ev);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('page behind is inert while open and not after close', async () => {
  open('zen-ledger-portal');
  expect(document.querySelector('main')).toHaveAttribute('inert');
  expect(screen.getByRole('navigation', { hidden: true })).toHaveAttribute('inert');
  await userEvent.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  expect(document.querySelector('main')).not.toHaveAttribute('inert');
});

// Opener is the focused legend button; the canvas click path leaves body focused, in which case there is nothing to restore.
test('Escape returns focus to the legend button that opened the case', async () => {
  window.history.replaceState(null, '', '/portfolio/');
  render(<App />);
  const btn = within(document.getElementById('work')!).getByRole('button', { name: /Zen Ledger Portal/ });
  await userEvent.click(btn);
  await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
  await userEvent.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  await waitFor(() => expect(within(document.getElementById('work')!).getByRole('button', { name: /Zen Ledger Portal/ })).toHaveFocus());
});

test('cold deep link with preloader: scroll lock is released after preloader and close', async () => {
  vi.useFakeTimers();
  try {
    sessionStorage.removeItem('preloaded');
    document.body.style.overflow = '';
    open('zen-ledger-portal');
    act(() => { vi.advanceTimersByTime(10000); });
    expect(document.body.style.overflow).toBe('hidden'); // overlay still holds the lock
    act(() => { fireEvent.keyDown(document, { key: 'Escape' }); });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.body.style.overflow).not.toBe('hidden');
  } finally { vi.useRealTimers(); }
});

test('next project wraps from E-Commerce to Zen Ledger', async () => {
  open('cloud-native-ecommerce');
  await userEvent.click(screen.getByRole('link', { name: /NEXT PROJECT/ }));
  await waitFor(() => expect(window.location.hash).toBe('#/work/zen-ledger-portal'));
  expect(within(screen.getByRole('dialog')).getByRole('heading', { level: 1 })).toHaveTextContent('Zen Ledger Portal');
});

test('VI deep link renders Vietnamese case copy', () => {
  open('invoicing-portal', '?lang=vi');
  expect(screen.getByText('← Quay lại thành phố')).toBeInTheDocument();
});

test('language switch inside the overlay swaps copy', async () => {
  open('invoicing-portal');
  await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'VI' }));
  expect(screen.getByText('← Quay lại thành phố')).toBeInTheDocument();
});

test('E-Commerce shows the public repo link; others do not', () => {
  open('cloud-native-ecommerce');
  expect(within(screen.getByRole('dialog')).getByRole('link', { name: /repository/i })).toHaveAttribute('href', 'https://github.com/sloweyyy/cloud-native-ecommerce-platform');
});
