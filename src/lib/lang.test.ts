import { resolveInitialLang, withLangParam } from './lang';
test('url wins', () => expect(resolveInitialLang({ search: '?lang=vi', stored: 'en', languages: ['en-US'] })).toBe('vi'));
test('stored beats browser', () => expect(resolveInitialLang({ search: '', stored: 'en', languages: ['vi-VN'] })).toBe('en'));
test('vietnamese browser', () => expect(resolveInitialLang({ search: '', stored: null, languages: ['vi-VN', 'en'] })).toBe('vi'));
test('default english, ignores junk', () => expect(resolveInitialLang({ search: '?lang=fr', stored: 'xx', languages: ['fr'] })).toBe('en'));
test('withLangParam keeps hash', () => expect(withLangParam('/portfolio/?a=1#/work/invoicing-portal', 'vi')).toBe('/portfolio/?a=1&lang=vi#/work/invoicing-portal'));
test('withLangParam replaces lang', () => expect(withLangParam('/portfolio/?lang=vi', 'en')).toBe('/portfolio/?lang=en'));
