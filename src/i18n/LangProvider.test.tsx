import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LangProvider, useLang } from './LangProvider';
import { useRoute } from '../hooks/useRoute';

function Probe() {
  const { t, setLang } = useLang();
  const { route } = useRoute();
  return (
    <>
      <span>{t.nav.contact}</span>
      <span data-testid="route">{route.kind}</span>
      <button onClick={() => setLang('en')}>en</button>
    </>
  );
}

afterEach(() => {
  localStorage.clear();
  document.documentElement.lang = '';
  window.history.replaceState(null, '', '/');
});

test('cold deep link with ?lang=vi renders VI and sets <html lang>', () => {
  window.history.replaceState(null, '', '/portfolio/?lang=vi#/work/invoicing-portal');
  render(<LangProvider><Probe /></LangProvider>);
  expect(screen.getByText('Liên hệ')).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('vi');
  expect(screen.getByTestId('route')).toHaveTextContent('case');
});

test('setLang keeps hash and persists', async () => {
  window.history.replaceState(null, '', '/portfolio/?lang=vi#/work/invoicing-portal');
  render(<LangProvider><Probe /></LangProvider>);
  await userEvent.click(screen.getByText('en'));
  expect(location.hash).toBe('#/work/invoicing-portal');
  expect(localStorage.getItem('lang')).toBe('en');
  expect(location.search).toContain('lang=en');
  expect(screen.getByText('Contact')).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('en');
});
