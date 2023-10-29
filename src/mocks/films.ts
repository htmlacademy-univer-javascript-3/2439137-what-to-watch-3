import { FilmType } from '../types/film.ts';

export const films: FilmType[] = [
  {
    id: '1',
    title: 'The Grand Budapest Hotel',
    imgPath: 'img/the-grand-budapest-hotel-poster.jpg',
    backgroundImgPath: 'img/bg-the-grand-budapest-hotel.jpg',
    genre: 'Drama',
    releaseDate: 2014,
    rating: ['8,9', 240],
    runTime: 99,
    annotation: [
      'In the 1930s, the Grand Budapest Hotel is a popular European ski\n' +
        '              resort, presided over by concierge Gustave H. (Ralph Fiennes).\n' +
        '              Zero, a junior lobby boy, becomes Gustave&rsquo;s friend and\n' +
        '              protege.',
      'Gustave prides himself on providing first-class service to the\n' +
        '              hotel&rsquo;s guests, including satisfying the sexual needs of the\n' +
        '              many elderly women who stay there. When one of Gustave&rsquo;s\n' +
        '              lovers dies mysteriously, Gustave finds himself the recipient of a\n' +
        '              priceless painting and the chief suspect in her murder.',
    ],
    director: 'Wes Anderson',
    starring: [
      'Bill Murray',
      'Edward Norton',
      'Jude Law',
      'Willem Dafoe',
      'Saoirse Ronan',
      'Tony Revoloru',
      'Tilda Swinton',
      'Tom Wilkinson',
      'Owen Wilkinson',
      'Adrien Brody',
      'Ralph Fiennes',
      'Jeff Goldblum',
    ],
  },
  {
    id: '2',
    title: 'Fantastic Beasts: The Crimes of Grindelwald',
    imgPath: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    genre: 'Kids & Family',
    isMyList: true,
  },
  {
    id: '3',
    title: 'Bohemian Rhapsody',
    genre: 'Dramas',
    imgPath: 'img/bohemian-rhapsody.jpg',
    isMyList: true,
  },
  {
    id: '4',
    title: 'Macbeth',
    genre: 'Dramas',
    imgPath: 'img/macbeth.jpg',
    isMyList: true,
  },
  {
    id: '5',
    title: 'Aviator',
    genre: 'Dramas',
    imgPath: 'img/aviator.jpg',
    isMyList: true,
  },
  {
    id: '6',
    title: 'We need to talk about Kevin',
    genre: 'Thrillers',
    imgPath: 'img/we-need-to-talk-about-kevin.jpg',
    isMyList: true,
  },
  {
    id: '7',
    title: 'What We Do in the Shadows',
    genre: 'Comedies',
    imgPath: 'img/what-we-do-in-the-shadows.jpg',
    isMyList: true,
  },
  {
    id: '8',
    title: 'Revenant',
    genre: 'Thrillers',
    imgPath: 'img/revenant.jpg',
    isMyList: true,
  },
  {
    id: '9',
    title: 'Johnny English',
    genre: 'Comedies',
    imgPath: 'img/johnny-english.jpg',
    isMyList: true,
  },
  {
    id: '10',
    title: 'Shutter Island',
    genre: 'Horror',
    imgPath: 'img/shutter-island.jpg',
    isMyList: true,
  },
  {
    id: '11',
    title: 'Pulp Fiction',
    genre: 'Crime',
    imgPath: 'img/pulp-fiction.jpg',
  },
  {
    id: '12',
    title: 'No Country for Old Men',
    genre: 'Crime',
    imgPath: 'img/no-country-for-old-men.jpg',
  },
  {
    id: '13',
    title: 'Snatch',
    imgPath: 'img/snatch.jpg',
  },
  {
    id: '14',
    title: 'Moonrise Kingdom',
    genre: 'Comedies',
    imgPath: 'img/moonrise-kingdom.jpg',
  },
  {
    id: '15',
    title: 'Seven Years in Tibet',
    genre: 'Documentary',
    imgPath: 'img/seven-years-in-tibet.jpg',
  },
  {
    id: '16',
    title: 'Midnight Special',
    genre: 'Sci-Fi',
    imgPath: 'img/midnight-special.jpg',
  },
  {
    id: '17',
    title: 'War of the Worlds',
    genre: 'Sci-Fi',
    imgPath: 'img/war-of-the-worlds.jpg',
  },
  {
    id: '18',
    title: 'Dardjeeling Limited',
    genre: 'Comedies',
    imgPath: 'img/dardjeeling-limited.jpg',
  },
  {
    id: '19',
    title: 'Orlando',
    genre: 'Romance',
    imgPath: 'img/orlando.jpg',
  },
  {
    id: '20',
    title: 'Mindhunter',
    genre: 'Thrillers',
    imgPath: 'img/mindhunter.jpg',
  },
];
