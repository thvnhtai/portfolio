import { render, act } from '@testing-library/react';
import { Cursor } from './Cursor';
import { mockReducedMotion } from '../../test-utils';

const move = (pointerType: string) => {
  const e = new Event('pointermove') as Event & { pointerType: string; clientX: number; clientY: number };
  Object.assign(e, { pointerType, clientX: 10, clientY: 10 });
  act(() => { window.dispatchEvent(e); });
};

test('renders nothing under reduced motion', () => {
  mockReducedMotion(true);
  const { container } = render(<Cursor />);
  expect(container).toBeEmptyDOMElement();
});

test('ignores touch pointers, follows mouse', () => {
  mockReducedMotion(false);
  const { container } = render(<Cursor />);
  const el = container.firstElementChild as HTMLElement;
  move('touch');
  expect(el.style.opacity).not.toBe('1');
  move('mouse');
  expect(el.style.opacity).toBe('1');
});
