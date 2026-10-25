import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';
import { Providers } from '../../test-utils';

const setup = () => render(<Providers><Hero badgeSlot={<div>BADGE</div>} /></Providers>);

test('CV link points under the base path', () => {
  setup();
  expect(screen.getByRole('link', { name: /Download CV/ })).toHaveAttribute('href', '/cv/Tai_Nguyen_CV.pdf');
});
test('headline, badge slot, education and no phone', () => {
  const { container } = setup();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('FULLSTACK ENGINEER.');
  expect(screen.getByText('BADGE')).toBeInTheDocument();
  expect(container).toHaveTextContent('GPA 8.57');
  expect(container.textContent).not.toMatch(/\+84/);
});

test('headline period carries the accent marker', () => {
  const { container } = setup();
  const marked = container.querySelectorAll('h1 [data-accent]');
  expect(marked.length).toBe(1);
  expect(marked[0]?.textContent).toBe('.');
});
test('badge hint hidden without a badge', () => {
  render(<Providers><Hero badgeSlot={null} /></Providers>);
  expect(screen.queryByText(/Drag the badge/)).toBeNull();
});
