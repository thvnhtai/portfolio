import { render, screen, fireEvent, act } from '@testing-library/react';
import { Contact } from './Contact';
import { Providers, mockReducedMotion } from '../../test-utils';

const EMAIL = 'thanhtaiwork04@gmail.com';
const setup = () => render(<Providers><Contact /></Providers>);

const origClip = Object.getOwnPropertyDescriptor(navigator, "clipboard");
const origExec = document.execCommand;
afterEach(() => {
  mockReducedMotion(false);
  if (origClip) Object.defineProperty(navigator, "clipboard", origClip); else delete (navigator as unknown as Record<string, unknown>).clipboard;
  document.execCommand = origExec;
});

test('failed copy shows the failure toast, not success', async () => {
  Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
  document.execCommand = vi.fn().mockReturnValue(false);
  setup();
  fireEvent.click(screen.getByRole('button', { name: EMAIL }));
  expect(await screen.findByText(/Couldn't copy/)).toBeInTheDocument();
  expect(screen.queryByText(/Email copied/)).toBeNull();
});

test('successful copy shows the copied toast', async () => {
  Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockResolvedValue(undefined) }, configurable: true });
  setup();
  fireEvent.click(screen.getByRole('button', { name: EMAIL }));
  expect(await screen.findByText(/Email copied/)).toBeInTheDocument();
});

test('links are real external links', () => {
  setup();
  const li = screen.getByRole('link', { name: /LinkedIn/ });
  expect(li).toHaveAttribute('href', 'https://www.linkedin.com/in/tai-nt');
  expect(li).toHaveAttribute('target', '_blank');
  expect(li).toHaveAttribute('rel', 'noopener noreferrer');
  expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/thvnhtai');
  expect(screen.getByRole('link', { name: /LeetCode/ })).toHaveAttribute('href', 'https://leetcode.com/u/thvnhtai');
});

test('has a heading and a live clock', () => {
  setup();
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('CONTACT');
  expect(screen.getByText(/Probably (awake|asleep)/)).toBeInTheDocument();
});

test('hover scrambles the glyphs but keeps the accessible name; reduced motion does not scramble', () => {
  vi.useFakeTimers();
  setup();
  const btn = screen.getByRole('button', { name: EMAIL });
  fireEvent.mouseEnter(btn);
  act(() => { vi.advanceTimersByTime(28); });
  expect(btn.textContent).not.toBe(EMAIL);
  expect(btn.querySelector('[aria-hidden="true"]')).not.toBeNull();
  act(() => { vi.advanceTimersByTime(28 * 80); });
  expect(btn.textContent).toBe(EMAIL);
  vi.useRealTimers();
});

test('reduced motion: no scramble', () => {
  vi.useFakeTimers();
  mockReducedMotion(true);
  setup();
  const btn = screen.getByRole('button', { name: EMAIL });
  fireEvent.mouseEnter(btn);
  act(() => { vi.advanceTimersByTime(28); });
  expect(btn.textContent).toBe(EMAIL);
  vi.useRealTimers();
});
