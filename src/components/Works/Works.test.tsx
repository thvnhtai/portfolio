import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Providers } from '../../test-utils';
import { Works } from './Works';

test('legend buttons open the case and store the origin', async () => {
  location.hash = '';
  render(<Providers><Works /></Providers>);
  expect(screen.getAllByRole('button')).toHaveLength(5);
  await userEvent.click(screen.getByRole('button', { name: /Zen Ledger Portal/ }));
  await waitFor(() => expect(location.hash).toBe('#/work/zen-ledger-portal'));
  expect(JSON.parse(sessionStorage.getItem('caseOrigin') ?? 'null')).toEqual(expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }));
});

test('hovering or focusing a legend button shows a tooltip, leaving hides it', async () => {
  render(<Providers><Works /></Providers>);
  const btn = screen.getByRole('button', { name: /Invoicing Portal/ });
  await userEvent.hover(btn);
  const tip = screen.getAllByText('Invoicing Portal').find((el) => el.getAttribute('aria-hidden') === 'true');
  expect(tip).toBeTruthy();
  await userEvent.unhover(btn);
  expect(screen.getAllByText('Invoicing Portal')).toHaveLength(1);
});

test('rapid double click opens the case once', async () => {
  location.hash = '';
  await new Promise((r) => setTimeout(r, 50)); // let the reset's own hashchange fire first
  const spy = vi.fn();
  window.addEventListener('hashchange', spy);
  render(<Providers><Works /></Providers>);
  const btn = screen.getByRole('button', { name: /Voucher/ });
  await userEvent.dblClick(btn);
  await waitFor(() => expect(location.hash).toBe('#/work/voucher-dashboard'));
  await waitFor(() => expect(spy).toHaveBeenCalled());
  await new Promise((r) => setTimeout(r, 50));
  expect(spy).toHaveBeenCalledTimes(1);
  window.removeEventListener('hashchange', spy);
});
