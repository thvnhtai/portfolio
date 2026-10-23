import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { stubPendingFetch } from '../../test-utils';

beforeEach(stubPendingFetch);

beforeEach(() => { localStorage.clear(); sessionStorage.setItem('preloaded', '1'); window.history.replaceState(null, '', '/portfolio/'); });

test('⌘K opens, typing filters, Enter opens the case', async () => {
  render(<App />);
  await userEvent.keyboard('{Meta>}k{/Meta}');
  expect(screen.getByRole('combobox')).toHaveFocus();
  await userEvent.type(screen.getByRole('combobox'), 'invoic');
  await userEvent.keyboard('{Enter}');
  expect(window.location.hash).toBe('#/work/invoicing-portal');
  expect(screen.queryByRole('combobox')).toBeNull();
});

test('switch language command', async () => {
  render(<App />);
  await userEvent.keyboard('{Control>}k{/Control}');
  await userEvent.type(screen.getByRole('combobox'), 'viet');
  await userEvent.keyboard('{Enter}');
  expect(screen.getAllByText('Liên hệ').length).toBeGreaterThan(0);
});

test('arrows move aria-activedescendant; Escape closes and restores focus to opener', async () => {
  render(<App />);
  const hint = screen.getByRole('button', { name: /⌘K/ });
  await userEvent.click(hint);
  const box = screen.getByRole('combobox');
  const first = box.getAttribute('aria-activedescendant');
  await userEvent.keyboard('{ArrowDown}');
  expect(box.getAttribute('aria-activedescendant')).not.toBe(first);
  expect(screen.getAllByRole('option').filter((o) => o.getAttribute('aria-selected') === 'true')).toHaveLength(1);
  await userEvent.keyboard('{Escape}');
  expect(screen.queryByRole('combobox')).toBeNull();
  expect(hint).toHaveFocus();
});

test('Escape with a case open closes only the palette', async () => {
  window.history.replaceState(null, '', '/portfolio/#/work/zen-ledger-portal');
  render(<App />);
  await userEvent.keyboard('{Meta>}k{/Meta}');
  expect(screen.getByRole('combobox')).toBeInTheDocument();
  await userEvent.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('combobox')).toBeNull());
  expect(window.location.hash).toBe('#/work/zen-ledger-portal');
  expect(screen.getByRole('heading', { level: 1, name: /Zen Ledger/i })).toBeInTheDocument();
});

test('backdrop click closes', async () => {
  render(<App />);
  await userEvent.keyboard('{Meta>}k{/Meta}');
  await userEvent.click(screen.getByRole('dialog').parentElement!);
  expect(screen.queryByRole('combobox')).toBeNull();
});

test('no results shows status, Enter is a no-op', async () => {
  render(<App />);
  await userEvent.keyboard('{Meta>}k{/Meta}');
  const box = screen.getByRole('combobox');
  await userEvent.type(box, 'zzzqqq');
  expect(screen.getByText('No results')).toBeInTheDocument();
  expect(box).toHaveAttribute('aria-expanded', 'false');
  expect(box).not.toHaveAttribute('aria-activedescendant');
  await userEvent.keyboard('{Enter}');
  expect(screen.getByRole('combobox')).toBeInTheDocument();
});

test('Navigate while a case is open closes it, then scrolls to the section', async () => {
  const spy = vi.fn();
  Element.prototype.scrollIntoView = spy;
  window.history.replaceState(null, '', '/portfolio/#/work/zen-ledger-portal');
  render(<App />);
  await userEvent.keyboard('{Meta>}k{/Meta}');
  await userEvent.type(screen.getByRole('combobox'), 'contact');
  await userEvent.keyboard('{Enter}');
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  await waitFor(() => expect(spy).toHaveBeenCalled());
  expect((spy.mock.instances as Element[]).some((el) => el.id === 'contact')).toBe(true);
});

test('Copy email with clipboard failing shows the failure toast', async () => {
  const orig = document.execCommand;
  Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('no')) }, configurable: true });
  document.execCommand = () => false;
  render(<App />);
  await userEvent.keyboard('{Meta>}k{/Meta}');
  await userEvent.type(screen.getByRole('combobox'), 'copy email');
  await userEvent.keyboard('{Enter}');
  expect(await screen.findByText("Couldn't copy — select the email")).toBeInTheDocument();
  document.execCommand = orig;
});

test('⌘K typed in an input outside the palette does nothing', async () => {
  render(<App />);
  const o = document.createElement('input');
  document.body.appendChild(o);
  o.focus();
  await userEvent.keyboard('{Meta>}k{/Meta}');
  expect(screen.queryByRole('combobox')).toBeNull();
  o.remove();
});
