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
    .slice(0, Math.min(4, starring.length))
    .join(', ')
    .concat(starring.length > 4 ? ' and other' : '');
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
