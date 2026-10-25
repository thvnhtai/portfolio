import { copyText } from './clipboard';

const origClip = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
const origExec = document.execCommand;
const setClip = (v: unknown) => Object.defineProperty(navigator, 'clipboard', { value: v, configurable: true });
afterEach(() => {
  if (origClip) Object.defineProperty(navigator, 'clipboard', origClip); else delete (navigator as unknown as Record<string, unknown>).clipboard;
  document.execCommand = origExec;
});

test('copyText reports failure when no clipboard', async () => {
  setClip(undefined);
  document.execCommand = vi.fn().mockReturnValue(false);
  expect(await copyText('x')).toBe(false);
});
test('copyText uses clipboard API when available', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  setClip({ writeText });
  expect(await copyText('x')).toBe(true);
  expect(writeText).toHaveBeenCalledWith('x');
});
test('copyText falls back to execCommand', async () => {
  setClip(undefined);
  document.execCommand = vi.fn().mockReturnValue(true);
  expect(await copyText('x')).toBe(true);
  expect(document.querySelector('textarea')).toBeNull();
});
test('rejecting writeText falls back to execCommand', async () => {
  setClip({ writeText: vi.fn().mockRejectedValue(new Error('denied')) });
  document.execCommand = vi.fn().mockReturnValue(true);
  expect(await copyText('x')).toBe(true);
  expect(document.execCommand).toHaveBeenCalledWith('copy');
});
test('fallback restores focus to the previously focused element', async () => {
  setClip(undefined);
  document.execCommand = vi.fn().mockReturnValue(true);
  const b = document.createElement('button');
  document.body.appendChild(b);
  b.focus();
  await copyText('x');
  expect(document.activeElement).toBe(b);
  b.remove();
});
