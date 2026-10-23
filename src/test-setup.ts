import '@testing-library/jest-dom/vitest';

const originalMatchMedia = window.matchMedia;
afterEach(() => {
  if (originalMatchMedia === undefined) delete (window as { matchMedia?: unknown }).matchMedia;
  else window.matchMedia = originalMatchMedia;
});

// jsdom has no canvas; make getContext quietly return null (=> no WebGL, static fallbacks)
HTMLCanvasElement.prototype.getContext = (() => null) as never;

// default: network is unavailable in tests (LeetCode JSON etc.); individual tests override
beforeEach(() => {
  vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network disabled in tests'));
});
