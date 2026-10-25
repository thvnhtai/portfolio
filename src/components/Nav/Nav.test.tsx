import { render, screen, act, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { Nav } from './Nav';
import { Providers, mockReducedMotion, stubPendingFetch } from '../../test-utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useInView } from '../../hooks/useInView';

beforeEach(stubPendingFetch);

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState(null, '', '/portfolio/');
});

test('EN/VI switch translates nav and keeps the open case', async () => {
  window.history.replaceState(null, '', '/portfolio/#/work/zen-ledger-portal');
  render(<App />);
  const nav = within(screen.getByRole('navigation'));
  await userEvent.click(nav.getByRole('button', { name: 'VI' }));
  expect(screen.getByRole('button', { name: 'Liên hệ' })).toBeInTheDocument();
  expect(location.hash).toBe('#/work/zen-ledger-portal');
  expect(nav.getByRole('button', { name: 'VI' })).toHaveAttribute('aria-pressed', 'true');
});

test('⌘K hint calls onOpenPalette, logo calls onLogoClick', async () => {
  const open = vi.fn();
  const logo = vi.fn();
  render(<Providers><Nav onOpenPalette={open} onLogoClick={logo} /></Providers>);
  await userEvent.click(screen.getByRole('button', { name: /⌘K/ }));
  expect(open).toHaveBeenCalled();
  await userEvent.click(screen.getByRole('button', { name: /TAI NGUYEN/ }));
  expect(logo).toHaveBeenCalled();
});

test('Work scrolls to its section', async () => {
  mockReducedMotion(true);
  const el = document.createElement('section');
  el.id = 'work';
  el.scrollIntoView = vi.fn();
  document.body.appendChild(el);
  render(<Providers><Nav onOpenPalette={() => {}} onLogoClick={() => {}} /></Providers>);
  await userEvent.click(screen.getByRole('button', { name: 'Work' }));
  expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
  el.remove();
});

test('app root gets swapping class on language change, not under reduced motion', async () => {
  mockReducedMotion(false);
  const { container, unmount } = render(<App />);
  await userEvent.click(screen.getByRole('button', { name: 'VI' }));
  expect(container.firstElementChild).toHaveClass('swapping');
  await act(() => new Promise((r) => setTimeout(r, 300)));
  expect(container.firstElementChild).not.toHaveClass('swapping');
  unmount();
  mockReducedMotion(true);
  const r2 = render(<App />);
  await userEvent.click(screen.getByRole('button', { name: 'EN' }));
  expect(r2.container.firstElementChild).not.toHaveClass('swapping');
});

test('hooks degrade without matchMedia / IntersectionObserver', () => {
  const orig = window.matchMedia;
  // @ts-expect-error simulate missing
  delete window.matchMedia;
  function Probe() {
    const rm = useReducedMotion();
    const [ref, inView] = useInView<HTMLDivElement>();
    return <div ref={ref}>{String(rm)}-{String(inView)}</div>;
  }
  render(<Probe />);
  expect(screen.getByText('false-true')).toBeInTheDocument();
  window.matchMedia = orig;
});

test('useReducedMotion reflects the media query', () => {
  mockReducedMotion(true);
  function Probe() { return <p>{String(useReducedMotion())}</p>; }
  render(<Probe />);
  expect(screen.getByText('true')).toBeInTheDocument();
});

test('highlights the section crossing the middle of the viewport', () => {
  let cb: IntersectionObserverCallback = () => {};
  vi.stubGlobal('IntersectionObserver', class { constructor(c: IntersectionObserverCallback) { cb = c; } observe() {} disconnect() {} });
  const main = document.createElement('main');
  main.innerHTML = '<section id="work"></section><section id="skills"></section>';
  document.body.appendChild(main);
  render(<Providers><Nav onOpenPalette={() => {}} onLogoClick={() => {}} /></Providers>);
  act(() => cb([{ isIntersecting: true, target: main.querySelector('#skills')! } as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(screen.getByRole('button', { name: 'Skills' })).toHaveAttribute('aria-current', 'true');
  expect(screen.getByRole('button', { name: 'Work' })).not.toHaveAttribute('aria-current');
  main.remove();
  vi.unstubAllGlobals();
});
