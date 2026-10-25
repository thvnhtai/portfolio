import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { stubPendingFetch } from './test-utils';

beforeEach(stubPendingFetch);
test('renders the brand headline', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('FULLSTACK ENGINEER.');
});

test('every section renders its component and no stray text', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'The stack.' })).toBeInTheDocument();
  document.querySelectorAll('section').forEach((sec) => {
    sec.childNodes.forEach((n) => { if (n.nodeType === 3) expect(n.textContent).toBe(''); });
  });
});

test('Escape on the preloader skips it but keeps a deep-linked case open', () => {
  window.history.pushState({}, '', '/#/work/invoicing-portal');
  sessionStorage.clear();
  render(<App />);
  expect(screen.getByTestId('preloader')).toBeInTheDocument();
  fireEvent.keyDown(document.body, { key: 'Escape' });
  expect(screen.queryByTestId('preloader')).not.toBeInTheDocument();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  window.history.pushState({}, '', '/');
});

test('closing a cold deep-linked case focuses the work heading', () => {
  sessionStorage.setItem('preloaded', '1');
  window.history.pushState({}, '', '/#/work/invoicing-portal');
  render(<App />);
  fireEvent.keyDown(document.body, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(document.querySelector('#work h2')).toHaveFocus();
  window.history.pushState({}, '', '/');
});
