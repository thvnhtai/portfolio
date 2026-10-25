import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Providers } from '../../test-utils';

const scene = { start: vi.fn(), stop: vi.fn(), dispose: vi.fn() };
vi.mock('./BadgeScene', () => ({ createBadgeScene: vi.fn(() => scene) }));

test('live branch shows the hint and starts the scene', async () => {
  HTMLCanvasElement.prototype.getContext = (() => ({ getExtension: () => null })) as never;
  const { default: Badge } = await import('./Badge');
  const { unmount } = render(<Providers><Badge /></Providers>);
  expect(screen.getByText(/Drag the badge/)).toBeInTheDocument();
  await waitFor(() => expect(scene.start).toHaveBeenCalled());
  unmount();
  expect(scene.dispose).toHaveBeenCalled();
});
