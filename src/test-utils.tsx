import type { ReactNode } from 'react';
import { vi } from 'vitest';
import { LangProvider } from './i18n/LangProvider';
import { ToastProvider } from './components/Toast/Toast';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <ToastProvider>{children}</ToastProvider>
    </LangProvider>
  );
}

export function mockReducedMotion(on: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: on && query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  })) as unknown as typeof window.matchMedia;
}

/** Tests that render <App/>: keep the LeetCode fetch pending so its late state update can't land outside act(). */
export function stubPendingFetch() {
  vi.spyOn(globalThis, 'fetch').mockReturnValue(new Promise<Response>(() => {}));
}
