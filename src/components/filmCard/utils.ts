const DEFAULT_COUNT_STARRING = 4;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;

export const getNameRating = function (rating: string) {
  const ratingNumber = parseFloat(rating.replace(',', '.'));
  switch (true) {
    case ratingNumber > 8:
      return 'Very good';
    default:
      return '';
  }
};

export const ratingSelector = function (ratingCount: number) {
  switch (ratingCount) {
    case 1:
      return 'rating';
    default:
      return 'ratings';
  }
};

export const starringToStringRow = function (starring: string[]) {
  return starring
    .slice(0, Math.min(DEFAULT_COUNT_STARRING, starring.length))
    .join(', ')
    .concat(starring.length > DEFAULT_COUNT_STARRING ? ' and other' : '');
};

export const starringToStringColumn = function (starring: string[]) {
  return starring.map((value) => `${value}, \n`);
};

export const dateToString = function (date: Date) {
  const dateOld = new Date(date);
  const dateOldChange = new Date(dateOld.setMonth(dateOld.getMonth() - 1));
  const year = dateOldChange.toLocaleString('en-us', { year: 'numeric' });
  const month = dateOldChange.toLocaleString('en-us', { month: 'long' });
  const day = dateOldChange.toLocaleString('en-us', { day: 'numeric' });
  return `${month} ${day}, ${year}`;
};

export const runTimeSelector = function (runTime: number) {
  return `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
};

export const runTimeSelectorMergedFormat = function (runTime: number) {
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
