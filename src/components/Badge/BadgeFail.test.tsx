import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Providers } from '../../test-utils';

vi.mock('./BadgeScene', () => { throw new Error('chunk failed'); });

test('failed scene chunk falls back to the static card', async () => {
  HTMLCanvasElement.prototype.getContext = (() => ({ getExtension: () => null })) as never;
  const { default: Badge } = await import('./Badge');
  render(<Providers><Badge /></Providers>);
  expect(await screen.findByAltText('Tai Nguyen')).toBeInTheDocument();
  expect(screen.queryByText(/Drag the badge/)).toBeNull();
});
