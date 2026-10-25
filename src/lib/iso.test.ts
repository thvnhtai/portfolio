import { buildingBox, hitTest, iso, isRoad } from './iso';

const O = { x: 500, y: 90, tw: 70, th: 35 };
test('iso projection', () => { expect(iso(0, 0, O)).toEqual({ x: 500, y: 90 }); expect(iso(1, 0, O)).toEqual({ x: 535, y: 107.5 }); });
test('roads', () => { expect(isRoad(4, 1)).toBe(true); expect(isRoad(2, 2)).toBe(false); });
test('hit test picks the building under the pointer', () => {
  const box = buildingBox(2, 2, 120, O);
  expect(hitTest([{ slug: 'zen-ledger-portal', box }], box.cx, box.top + 10)).toBe('zen-ledger-portal');
  expect(hitTest([{ slug: 'zen-ledger-portal', box }], 0, 0)).toBeNull();
});
