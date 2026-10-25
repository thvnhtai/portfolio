import { lockScroll } from './scrollLock';

beforeEach(() => { document.body.style.overflow = 'auto'; });
afterEach(() => { document.body.style.overflow = ''; });

test('nested locks release in either order; last release restores original', () => {
  const a = lockScroll(); const b = lockScroll();
  expect(document.body.style.overflow).toBe('hidden');
  a(); expect(document.body.style.overflow).toBe('hidden');
  b(); expect(document.body.style.overflow).toBe('auto');
  const c = lockScroll(); const d = lockScroll();
  d(); c(); expect(document.body.style.overflow).toBe('auto');
});
test('double release is a no-op', () => {
  const a = lockScroll(); const b = lockScroll();
  a(); a();
  expect(document.body.style.overflow).toBe('hidden');
  b(); expect(document.body.style.overflow).toBe('auto');
});
