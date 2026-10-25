import { render, screen } from '@testing-library/react';
import { mockReducedMotion } from '../../test-utils';
import { ArchDiagram } from './ArchDiagram';

const anim = (c: HTMLElement) => c.querySelector('animate, animateMotion');
const draw = () => render(<ArchDiagram nodes={['A', 'B']} note="Runs on K8s" color="#ff4d00" />);

test('diagram is labelled', () => {
  render(<ArchDiagram nodes={['React UI', 'Go service']} note="" color="#ff4d00" />);
  expect(screen.getByRole('img', { name: 'React UI → Go service' })).toBeInTheDocument();
});

test('note is a paragraph outside the svg', () => {
  draw();
  const p = screen.getByText('Runs on K8s');
  expect(p.tagName).toBe('P');
  expect(p.closest('svg')).toBeNull();
});

test('animates when in view and motion allowed', () => {
  expect(anim(draw().container)).not.toBeNull();
});

test('no animation under reduced motion', () => {
  mockReducedMotion(true);
  expect(anim(draw().container)).toBeNull();
});

test('no animation while off-screen', () => {
  vi.stubGlobal('IntersectionObserver', class {
    constructor(private cb: IntersectionObserverCallback) {}
    observe() { this.cb([{ isIntersecting: false } as IntersectionObserverEntry], this as never); }
    disconnect() {}
  });
  try { expect(anim(draw().container)).toBeNull(); } finally { vi.unstubAllGlobals(); }
});
