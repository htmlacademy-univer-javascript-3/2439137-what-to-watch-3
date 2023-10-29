import { ReviewsType } from '../types/filmReview.ts';

export const reviews: ReviewsType[] = [
  {
    id: '1',
    reviews: [
      {
        author: 'Kate Muir',
        date: new Date(2016, 12, 24),
        text:
          'Discerning travellers and Wes Anderson fans will luxuriate in the\n' +
          '              glorious Mittel-European kitsch of one of the director&rsquo;s\n' +
          '              funniest and most exquisitely designed films in years.',
        rating: '8,9',
      },
      {
        author: 'Bill Goodykoontz',
        date: new Date(2015, 11, 18),
        text:
          'Anderson&rsquo;s films are too precious for some, but for those of\n' +
          '              us willing to lose ourselves in them, they&rsquo;re a delight.\n' +
          '              &raquo;The Grand Budapest Hotel&raquo; is no different, except\n' +
          '              that he has added a hint of gravitas to the mix, improving the\n' +
          '              recipe.',
        rating: '8,0',
      },
      {
        author: 'Amanda Greever',
        date: new Date(2015,11,18),
        text: 'I didn&rsquo;t find it amusing, and while I can appreciate the\n' +
          '                creativity, it&rsquo;s an hour and 40 minutes I wish I could\n' +
          '                take back.',
        rating: '8,0',
      },
      {
        author: 'Matthew Lickona',
        date: new Date(2016,12,20),
        text: 'The mannered, madcap proceedings are often delightful,\n' +
          '                occasionally silly, and here and there, gruesome and/or\n' +
          '                heartbreaking.',
        rating: '7,2',
      }
    ],
  },
];
