import { act, fireEvent, render, screen } from '@testing-library/react';
import { Providers } from '../../test-utils';
import { Preloader } from './Preloader';

afterEach(() => vi.useRealTimers());
const mount = (done: () => void) => render(<Providers><Preloader onDone={done} /></Providers>);

test('skips on keypress, once', () => {
  vi.useFakeTimers(); const done = vi.fn(); mount(done);
  fireEvent.keyDown(window, { key: 'Enter' });
  fireEvent.pointerDown(window);
  act(() => vi.advanceTimersByTime(5000));
  expect(done).toHaveBeenCalledOnce();
});
test('skips on pointerdown', () => {
  vi.useFakeTimers(); const done = vi.fn(); mount(done);
  fireEvent.pointerDown(window);
  expect(done).toHaveBeenCalledOnce();
});
test('finishes on its own, once', () => {
  vi.useFakeTimers(); const done = vi.fn(); mount(done);
  act(() => vi.advanceTimersByTime(4500));
  expect(done).toHaveBeenCalledOnce();
});
test('shows translated greeting and skip hint', () => {
  vi.useFakeTimers(); mount(vi.fn());
  act(() => vi.advanceTimersByTime(3000));
  expect(screen.getAllByText(/Welcome in/).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/skip/i).length).toBeGreaterThan(0);
});
test('no callback after unmount', () => {
  vi.useFakeTimers(); const done = vi.fn(); const { unmount } = mount(done);
  unmount(); act(() => vi.advanceTimersByTime(5000));
  expect(done).not.toHaveBeenCalled();
});
test('locks body scroll while mounted and restores it', () => {
  vi.useFakeTimers(); document.body.style.overflow = 'auto';
  const { unmount } = mount(vi.fn());
  expect(document.body.style.overflow).toBe('hidden');
  unmount();
  expect(document.body.style.overflow).toBe('auto');
  document.body.style.overflow = '';
});
test('modifier-only keys do not skip', () => {
  vi.useFakeTimers(); const done = vi.fn(); mount(done);
  for (const key of ['Shift', 'Control', 'Alt', 'Meta']) fireEvent.keyDown(window, { key });
  expect(done).not.toHaveBeenCalled();
});
test('shows Vietnamese greeting with ?lang=vi', () => {
  vi.useFakeTimers(); window.history.pushState({}, '', '/?lang=vi');
  mount(vi.fn());
  act(() => vi.advanceTimersByTime(3000));
  expect(screen.getAllByText(/Chào bạn, mình là Tài/).length).toBeGreaterThan(0);
  window.history.pushState({}, '', '/');
});
