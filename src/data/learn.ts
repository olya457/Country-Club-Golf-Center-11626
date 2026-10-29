export const rules = [
  [
    'The aim of the game',
    'Play from the teeing area into the hole. In stroke play, add every stroke and penalty; the lowest total wins. In match play, compete to win individual holes.',
  ],
  [
    'Start each hole correctly',
    'Tee your ball between the tee markers and no more than two club-lengths behind their front edge. Carry no more than 14 clubs.',
  ],
  [
    'Play your ball as it lies',
    'Do not improve your lie or move the ball unless a Rule permits it. Identify your ball before playing and count a stroke when you intend to hit it, even if you miss.',
  ],
  [
    'Lost ball or out of bounds',
    'You have three minutes to search once you or your caddie begin looking. A lost ball outside a penalty area or a ball out of bounds normally means one penalty stroke and playing again from the previous spot. Play a provisional if appropriate.',
  ],
  [
    'Penalty areas',
    'Red or yellow markings identify penalty areas. You may play the ball as it lies without penalty, or take an available relief option for one penalty stroke. Red areas also allow lateral relief within two club-lengths of where the ball last crossed the edge, no nearer the hole.',
  ],
  [
    'Taking relief',
    'Cart paths and temporary water may allow free relief, depending on the situation. Use the correct relief area and drop from knee height. An unplayable ball usually costs one penalty stroke; some bunker options cost two.',
  ],
  [
    'On the putting green',
    'Mark the spot before lifting your ball, then replace it. You may clean it and repair ball marks. You may putt with the flagstick in or out. In regular stroke play, finish every hole.',
  ],
  [
    'Safety and care',
    'Wait until players ahead are out of range. Shout “Fore!” if a ball could hit someone. Repair pitch marks, rake bunkers, follow cart signs, and stay ready to play without rushing others.',
  ],
];

export const courseGuide = [
  [
    'Teeing area',
    'The start of each hole. Choose tees suited to your ability and check the hole map before your first shot.',
  ],
  [
    'Fairway',
    'The closely cut route toward the green. Choose a comfortable landing area instead of always chasing maximum distance.',
  ],
  [
    'Rough',
    'Longer grass beside the fairway. A poor lie can reduce control; a shorter club and a simple recovery are often useful.',
  ],
  [
    'Bunker',
    'A prepared sand area. Do not ground the club right behind or in front of the ball, or touch sand with a practice swing or backswing before the stroke. Rake your footprints afterwards.',
  ],
  [
    'Penalty area & boundary',
    'Red or yellow markings identify penalty areas; white stakes or lines often define out of bounds. Check the course’s Local Rules and available relief before dropping.',
  ],
  [
    'Green & fringe',
    'The green is the closely mown putting surface; the fringe surrounds it. Read the slope and leave bags and carts off the green. The fringe is not part of the putting green.',
  ],
];

export const clubGuide = [
  [
    'Driver',
    'For long tee shots, usually on par 4s and par 5s. Start with a balanced setup and a controlled swing.',
  ],
  [
    'Fairway woods',
    'For long shots from a good lie or an alternative off the tee. More loft can make launching the ball easier.',
  ],
  [
    'Hybrids',
    'Versatile alternatives to long irons for longer approaches and some light-rough shots. Check the lie before choosing one.',
  ],
  [
    'Irons',
    'For approach shots and controlled distances. Higher numbers generally mean more loft and a shorter flight.',
  ],
  [
    'Wedges',
    'For short approaches, chips and bunker shots. Pitching, gap, sand and lob wedges offer different lofts and bounce.',
  ],
  [
    'Putter',
    'For rolling the ball on the green, and sometimes from a smooth fringe. Practise both starting direction and distance control.',
  ],
];

export type LearningResource = {
  title: string;
  publisher: string;
  description: string;
  url: string;
  kind: 'Article' | 'Video';
};

export const resources: LearningResource[] = [
  {
    title: 'The official Rules of Golf',
    publisher: 'The R&A',
    description:
      'Look up the complete rules and check a situation before taking relief.',
    url: 'https://www.randa.org/en/rog/the-rules-of-golf',
    kind: 'Article',
  },
  {
    title: 'Your first round',
    publisher: 'Golf Australia',
    description: 'An introduction to getting started, equipment and scoring.',
    url: 'https://www.golf.org.au/thebasicsofgolf',
    kind: 'Article',
  },
  {
    title: 'What belongs in your golf bag?',
    publisher: 'Southern California PGA',
    description: 'A beginner’s introduction to equipment and club types.',
    url: 'https://scpga.com/golf-101/gear/',
    kind: 'Article',
  },
  {
    title: 'Rules & the golf course',
    publisher: 'The R&A',
    description:
      'A 12-minute guide plus short videos about the course, pace of play and common rules.',
    url: 'https://www.randa.org/en/videos/the-quick-guide-to-the-rules-of-golf',
    kind: 'Video',
  },
  {
    title: 'Driver, hybrid, wedge & putter lessons',
    publisher: 'Golf Digest · Cameron McCormick',
    description:
      'Choose a club-specific lesson from the Your Clubs: A User Guide video series.',
    url: 'https://www.golfdigest.com/video/instruction/cameron-mccormick-your-clubs-a-user-guide',
    kind: 'Video',
  },
  {
    title: 'Fairway woods, hybrids & irons',
    publisher: 'Golf Digest · Sara Dickson',
    description:
      'Three short long-game lessons covering driving, woods and hybrids, and iron play.',
    url: 'https://www.golfdigest.com/video/instruction/sara-dickson-7-minute-lessons-long-game',
    kind: 'Video',
  },
];
