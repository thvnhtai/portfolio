import { en } from '../content/en';
import { buildCommands, filterCommands, moveSelection } from './palette';

const noop = () => {};
const CMDS = buildCommands({ t: en, lang: 'en', setLang: noop, openCase: noop, scrollTo: noop, copyEmail: noop, downloadCv: noop, openUrl: noop });
test('filter by keyword', () => expect(filterCommands(CMDS, 'zen').map((c) => c.id)).toEqual(['case:zen-ledger-portal']));
test('empty query keeps all in order', () => expect(filterCommands(CMDS, '  ')).toEqual(CMDS));
test('moveSelection clamps', () => {
  expect(moveSelection(0, -1, 5)).toBe(0);
  expect(moveSelection(4, 1, 5)).toBe(4);
  expect(moveSelection(0, 1, 0)).toBe(0);
  expect(moveSelection(1, 1, 5)).toBe(2);
});
