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

export const starringToString = function (starring: string[]) {
  if (starring && starring.indexOf('other') + 1) {
    return starring
      .slice(0, starring.length - 1)
      .join(', ')
      .concat(' and other');
  }
  if (starring && starring.length) {
    return starring.join(', ');
  }
  return '';
};
