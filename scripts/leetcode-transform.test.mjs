import { test, expect } from 'vitest';
import fixture from './fixtures/leetcode-response.json';
import { transform } from './leetcode-transform.mjs';

test('transform maps difficulties and totals', () => {
  const s = transform(fixture.data);
  expect(s.total).toBe(s.easy + s.medium + s.hard);
  expect(s.allEasy).toBeGreaterThan(s.easy);
  expect(typeof s.calendar).toBe('object');
});
test('missing contest ranking becomes null', () => expect(transform({ ...fixture.data, userContestRanking: null }).contestRating).toBeNull());
test('missing user throws', () => expect(() => transform({ matchedUser: null })).toThrow());
test('partial data throws', () => {
  const { allQuestionsCount, ...rest } = fixture.data;
  expect(() => transform(rest)).toThrow();
});
test('graphql errors throw', () => expect(() => transform(fixture.data, [{ message: 'boom' }])).toThrow());
test('malformed calendar throws; empty calendar is fine', () => {
  const bad = structuredClone(fixture.data);
  bad.matchedUser.userCalendar.submissionCalendar = '{oops';
  expect(() => transform(bad)).toThrow();
  bad.matchedUser.userCalendar.submissionCalendar = null;
  expect(transform(bad).calendar).toEqual({});
});
