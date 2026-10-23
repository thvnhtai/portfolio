import { act, render, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { Providers, mockReducedMotion } from '../../test-utils';
import { useGravity } from './useGravity';

function Harness() {
  const go = useGravity();
  return <><button onClick={go}>go</button><p data-gravity style={{ transform: 'scale(2)' }}>falls</p></>;
}
const setup = () => {
  render(<Providers><Harness /></Providers>);
  const el = screen.getByText('falls');
  el.getBoundingClientRect = () => ({ top: 10, bottom: 50, left: 0, right: 100, width: 100, height: 40, x: 0, y: 10, toJSON() {} });
  return el;
};
afterEach(() => { vi.useRealTimers(); mockReducedMotion(false); });

test('no-op under reduced motion', () => {
  mockReducedMotion(true);
  const el = setup();
  act(() => screen.getByText('go').click());
  expect(el.style.transform).toBe('scale(2)');
});

test('falls then restores original inline styles', () => {
  vi.useFakeTimers();
  const el = setup();
  act(() => screen.getByText('go').click());
  expect(el.style.transform).toContain('translateY');
  act(() => { vi.advanceTimersByTime(3000); });
  expect(el.style.transform).toBe('scale(2)');
  expect(el.style.transition).toBe('');
});

test('no-op while a modal dialog is open', () => {
  const el = setup();
  const d = document.createElement('div'); d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); document.body.append(d);
  act(() => screen.getByText('go').click());
  expect(el.style.transform).toBe('scale(2)');
  d.remove();
});

test('restores pre-set transitionDelay and transform exactly', () => {
  vi.useFakeTimers();
  render(<Providers><Harness /></Providers>);
  const el = document.createElement('p');
  el.setAttribute('data-gravity', '');
  el.style.transitionDelay = '220ms';
  el.style.transform = 'translateX(5px)';
  el.getBoundingClientRect = () => ({ top: 10, bottom: 50, left: 0, right: 100, width: 100, height: 40, x: 0, y: 10, toJSON() {} });
  document.body.append(el);
  act(() => screen.getByText('go').click());
  expect(el.style.transform).toContain('translateY');
  act(() => { vi.advanceTimersByTime(3000); });
  expect(el.style.transitionDelay).toBe('220ms');
  expect(el.style.transform).toBe('translateX(5px)');
  el.remove();
});
