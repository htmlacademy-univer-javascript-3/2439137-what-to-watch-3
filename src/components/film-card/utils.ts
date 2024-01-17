const DEFAULT_COUNT_STARRING = 4;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;

enum NameRating {
  Awesome = 'Awesome',
  VeryGood = 'Very good',
  Good = 'Good',
  Normal = 'Normal',
  Bad = 'Bad',
  LackRating = ''
}

enum LowerBoundRating {
  Awesome = 10,
  VeryGood = 8,
  Good = 5,
  Normal = 3,
  Bad = 0,
}

enum RatingStringFormat {
  Singular = 'rating',
  Plural = 'ratings'
}

export const getNameRating = function (rating: string) {
  const ratingNumber = parseFloat(rating.replace(',', '.'));
  switch (true) {
    case ratingNumber === LowerBoundRating.Awesome:
      return NameRating.Awesome;
    case ratingNumber > LowerBoundRating.VeryGood:
      return NameRating.VeryGood;
    case ratingNumber > LowerBoundRating.Good:
      return NameRating.Good;
    case ratingNumber > LowerBoundRating.Normal:
      return NameRating.Normal;
    case ratingNumber > LowerBoundRating.Bad:
      return NameRating.Bad;
    default:
      return NameRating.LackRating;
  }
};

export const getRatingCorrectEnding = function (ratingCount: number) {
  switch (ratingCount) {
    case 1:
      return RatingStringFormat.Singular;
    default:
      return RatingStringFormat.Plural;
  }
};

export const getStarringShortList = function (starring: string[]) {
  return starring
    .slice(0, Math.min(DEFAULT_COUNT_STARRING, starring.length))
    .join(', ')
    .concat(starring.length > DEFAULT_COUNT_STARRING ? ' and other' : '');
};

export const getStarringFullList = function (starring: string[]) {
  return starring.join(', \n');
};

export const formatDate = function (date: Date) {
  const datePrimary = new Date(date);
  const dateChanged = new Date(datePrimary.setMonth(datePrimary.getMonth() - 1));
  const year = dateChanged.toLocaleString('en-us', { year: 'numeric' });
  const month = dateChanged.toLocaleString('en-us', { month: 'long' });
  const day = dateChanged.toLocaleString('en-us', { day: 'numeric' });
  return `${month} ${day}, ${year}`;
};

export const formatRunTimeFull = function (runTime: number) {
  return `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
};

export const formatRunTimeLeft = function (runTime: number) {
  const hours = Math.floor(runTime / SECONDS_IN_MINUTE / MINUTES_IN_HOUR);
  const minutes = Math.floor(
    (runTime - hours * MINUTES_IN_HOUR * SECONDS_IN_MINUTE) / SECONDS_IN_MINUTE,
  );
  const seconds =
    runTime -
    hours * MINUTES_IN_HOUR * SECONDS_IN_MINUTE -
    minutes * SECONDS_IN_MINUTE;
  return `-${hours ? `${hours}:` : ''}${minutes}:${seconds}`;
};
