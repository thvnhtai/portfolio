import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Badge, { supportsWebGL } from './Badge';
import { Providers, mockReducedMotion } from '../../test-utils';

test('probes WebGL once and falls back to the static card without it', () => {
  const gc = vi.fn(() => null);
  HTMLCanvasElement.prototype.getContext = gc as never;
  expect(supportsWebGL()).toBe(false);
  expect(supportsWebGL()).toBe(false);
  expect(gc).toHaveBeenCalledTimes(2); // webgl2 + webgl in the single probe, not per call
  render(<Providers><Badge /></Providers>);
  expect(gc).toHaveBeenCalledTimes(2);
  expect(screen.getByAltText('Tai Nguyen')).toBeInTheDocument();
  expect(screen.getByText('TAI NGUYEN')).toBeInTheDocument();
  expect(screen.getByText('Fullstack Engineer')).toBeInTheDocument();
  expect(screen.queryByText(/Drag the badge/)).toBeNull();
});

test('falls back under reduced motion', () => {
  mockReducedMotion(true);
  render(<Providers><Badge /></Providers>);
  expect(screen.getByAltText('Tai Nguyen')).toBeInTheDocument();
});
