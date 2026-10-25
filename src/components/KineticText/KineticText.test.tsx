import { render, screen } from '@testing-library/react';
import { KineticText } from './KineticText';

test('KineticText keeps accessible text and splits letters', () => {
  render(<KineticText as="h2" text="SELECTED WORKS" />);
  expect(screen.getByRole('heading', { name: 'SELECTED WORKS' })).toBeInTheDocument();
  expect(document.querySelectorAll('[aria-hidden="true"] span span').length).toBeGreaterThanOrEqual(13);
});

test('span variant exposes real text', () => {
  render(<KineticText text="HELLO WORLD" />);
  expect(screen.getByText('HELLO WORLD')).toBeInTheDocument();
});

test('one nowrap wrapper per word', () => {
  const { container } = render(<KineticText as="h1" text="FULLSTACK ENGINEER." />);
  expect(container.querySelectorAll('[class*="word"]').length).toBe(2);
});

test('accentLast marks only the final character', () => {
  const { container } = render(<KineticText as="h1" text="AB CD." accentLast />);
  const marked = container.querySelectorAll('[data-accent]');
  expect(marked.length).toBe(1);
  expect(marked[0]?.textContent).toBe('.');
});
