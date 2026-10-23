export const QUERY = `query($u:String!){matchedUser(username:$u){username profile{ranking} submitStatsGlobal{acSubmissionNum{difficulty count}} userCalendar{streak totalActiveDays submissionCalendar}} allQuestionsCount{difficulty count} userContestRanking(username:$u){rating}}`;

const num = (v) => (Number.isFinite(v) ? v : 0);

export function transform(data, errors) {
  if (errors?.length) throw new Error('GraphQL errors: ' + JSON.stringify(errors).slice(0, 200));
  const u = data?.matchedUser;
  if (!u) throw new Error('matchedUser missing');
  if (!Array.isArray(u.submitStatsGlobal?.acSubmissionNum) || !u.submitStatsGlobal.acSubmissionNum.length) throw new Error('acSubmissionNum missing');
  if (!Array.isArray(data.allQuestionsCount) || !data.allQuestionsCount.length) throw new Error('allQuestionsCount missing');
  const solved = (d) => num(u.submitStatsGlobal?.acSubmissionNum?.find((x) => x.difficulty === d)?.count);
  const all = (d) => num(data.allQuestionsCount?.find((x) => x.difficulty === d)?.count);
  const cal = u.userCalendar ?? {};
  let calendar = {};
  if (cal.submissionCalendar) {
    try { calendar = JSON.parse(cal.submissionCalendar); } catch { throw new Error('submissionCalendar malformed'); }
    if (!calendar || typeof calendar !== 'object' || Array.isArray(calendar)) throw new Error('submissionCalendar malformed');
  }
  const easy = solved('Easy'), medium = solved('Medium'), hard = solved('Hard');
  const allE = all('Easy'), allM = all('Medium'), allH = all('Hard');
  if (![easy + medium + hard, allE, allM, allH].every((n) => n > 0)) throw new Error('zero totals');
  const rating = data.userContestRanking?.rating;
  return {
    fetchedAt: new Date().toISOString(),
    username: 'thvnhtai',
    total: easy + medium + hard,
    easy, medium, hard,
    allEasy: allE, allMedium: allM, allHard: allH,
    ranking: Number.isFinite(u.profile?.ranking) ? u.profile.ranking : null,
    streak: num(cal.streak),
    activeDays: num(cal.totalActiveDays),
    contestRating: Number.isFinite(rating) ? Math.round(rating) : null,
    calendar,
  };
}
