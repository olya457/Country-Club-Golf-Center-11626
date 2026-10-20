import { ImageSourcePropType } from 'react-native';

export interface Course {
  id: string;
  name: string;
  level: string;
  holes: number;
  par: number;
  yards: number;
  price: number;
  description: string;
  image: ImageSourcePropType;
  map: ImageSourcePropType;
}
export const courses: Course[] = [
  {
    id: 'willow',
    name: 'Willow Park',
    level: 'Intermediate',
    holes: 18,
    par: 72,
    yards: 6150,
    price: 85,
    image: require('../assets/golf-willow-park.png'),
    map: require('../assets/golf-willow-park-map.png'),
    description:
      'Broad fairways lined with mature willows make Willow Park an inviting course for a relaxed yet rewarding round. Gentle elevation changes and well-placed sand bunkers encourage thoughtful club selection without demanding extreme distance. A small pond beside the closing green adds a memorable challenge to the finish.',
  },
  {
    id: 'lakeview',
    name: 'Lakeview Greens',
    level: 'Intermediate',
    holes: 18,
    par: 71,
    yards: 5980,
    price: 90,
    image: require('../assets/golf-lakeview-greens.png'),
    map: require('../assets/golf-lakeview-greens-map.png'),
    description:
      'Lakeview Greens follows the shoreline of a peaceful lake, opening up long views across the water. Generous landing areas offer room from the tee, while lakeside greens reward controlled approach shots. Low rolling terrain and pale sand bunkers create a balanced course suited to players building consistency.',
  },
  {
    id: 'meadow',
    name: 'Meadow Brook',
    level: 'Intermediate',
    holes: 9,
    par: 36,
    yards: 3050,
    price: 50,
    image: require('../assets/golf-meadow-brook.png'),
    map: require('../assets/golf-meadow-brook-map.png'),
    description:
      'Meadow Brook winds through open meadows, with a narrow stream crossing several fairways. Its compact layout combines approachable distances with small greens that reward careful placement. Scattered trees, modest bunkers, and gentle slopes make it an enjoyable choice for a shorter round.',
  },
  {
    id: 'cedar',
    name: 'Cedar Grove',
    level: 'Intermediate',
    holes: 18,
    par: 72,
    yards: 6280,
    price: 95,
    image: require('../assets/golf-cedar-grove.png'),
    map: require('../assets/golf-cedar-grove-map.png'),
    description:
      'Cedar Grove pairs spacious fairways with quiet corridors of tall cedar trees. Gradual doglegs and shallow greenside bunkers encourage accurate positioning throughout the round. A pair of small connected ponds introduces variety across the back nine without dominating the course.',
  },
  {
    id: 'eagle',
    name: 'Eagle Ridge',
    level: 'Advanced',
    holes: 18,
    par: 72,
    yards: 6950,
    price: 125,
    image: require('../assets/golf-eagle-ridge.png'),
    map: require('../assets/golf-eagle-ridge-map.png'),
    description:
      'Eagle Ridge climbs across an exposed ridgeline, combining elevated tees with sweeping views of the surrounding countryside. Narrow landing areas, deep bunkers, and uneven lies demand confident shot planning. Several raised greens and a dramatic downhill finishing hole make this a demanding and memorable round.',
  },
  {
    id: 'blackstone',
    name: 'Blackstone Valley',
    level: 'Advanced',
    holes: 18,
    par: 73,
    yards: 7120,
    price: 140,
    image: require('../assets/golf-blackstone-valley.png'),
    map: require('../assets/golf-blackstone-valley-map.png'),
    description:
      'Blackstone Valley threads through a rugged landscape of dark rock outcrops and densely wooded slopes. Long fairways bend around natural obstacles, while a winding creek challenges aggressive routes to the green. Deep sand traps and carefully protected putting surfaces reward precision from the opening tee to the final hole.',
  },
  {
    id: 'silver',
    name: 'Silver Dunes',
    level: 'Advanced',
    holes: 18,
    par: 71,
    yards: 6780,
    price: 130,
    image: require('../assets/golf-silver-dunes.png'),
    map: require('../assets/golf-silver-dunes-map.png'),
    description:
      'Silver Dunes stretches across open sandy terrain shaped by low dunes and flowing native grasses. Exposed fairways bring the wind into play, while irregular bunkers create several strategic routes on each hole. Firm approaches and subtly contoured greens favour controlled shots and a thoughtful ground game.',
  },
  {
    id: 'crown',
    name: 'Crown Pines',
    level: 'Advanced',
    holes: 18,
    par: 72,
    yards: 7040,
    price: 150,
    image: require('../assets/golf-crown-pines.png'),
    map: require('../assets/golf-crown-pines-map.png'),
    description:
      'Crown Pines is a demanding woodland course framed by towering pines and secluded greens. Tight doglegs, strategically positioned bunkers, and occasional water carries place a premium on accuracy. The final stretch combines a lakeside approach with a heavily guarded closing green for a challenging finish.',
  },
];
export interface Coach {
  id: string;
  name: string;
  level: string;
  years: number;
  specialty: string;
  price: number;
  image: ImageSourcePropType;
  description: string;
}
export const coaches: Coach[] = [
  {
    id: 'james',
    name: 'James Whitmore',
    level: 'Senior Coach',
    years: 14,
    specialty: 'Swing Technique & Consistency',
    price: 80,
    image: require('../assets/golf-james-whitmore.png'),
    description:
      'James helps golfers build a repeatable swing through clear instruction and focused practice. His sessions concentrate on posture, alignment, and balanced movement to improve consistency across different clubs. During practice matches, he guides players through shot selection and practical decisions on the course.',
  },
  {
    id: 'olivia',
    name: 'Olivia Bennett',
    level: 'Senior Coach',
    years: 11,
    specialty: 'Short Game & Putting',
    price: 75,
    image: require('../assets/golf-olivia-bennett.png'),
    description:
      'Olivia specialises in the shots that make a difference around the green. Her coaching develops distance control, confident putting, and reliable chipping through structured exercises. Practice matches focus on reading greens and choosing effective recovery shots.',
  },
  {
    id: 'daniel',
    name: 'Daniel Hayes',
    level: 'Performance Coach',
    years: 16,
    specialty: 'Driving & Long Game',
    price: 95,
    image: require('../assets/golf-daniel-hayes.png'),
    description:
      'Daniel works with experienced golfers looking to improve distance without sacrificing accuracy. His sessions focus on efficient movement, controlled power, and dependable contact with drivers and fairway woods. On the course, he helps players choose landing areas and manage demanding long holes.',
  },
  {
    id: 'sophie',
    name: 'Sophie Laurent',
    level: 'Club Coach',
    years: 8,
    specialty: 'Golf Fundamentals & Confidence',
    price: 60,
    image: require('../assets/golf-sophie-laurent.png'),
    description:
      'Sophie offers a welcoming approach for beginners and golfers returning to the game. She introduces grip, stance, and swing fundamentals through simple exercises adapted to each player’s pace. Her practice matches help golfers feel comfortable with course etiquette, club selection, and playing a complete round.',
  },
  {
    id: 'alexander',
    name: 'Alexander Reed',
    level: 'Performance Coach',
    years: 18,
    specialty: 'Course Strategy & Competitive Play',
    price: 100,
    image: require('../assets/golf-alexander-reed.png'),
    description:
      'Alexander helps confident players approach each round with a clear strategy. His coaching explores risk management, shot placement, and adapting decisions to different course layouts. Practice matches recreate competitive situations and encourage calm, deliberate play under pressure.',
  },
  {
    id: 'emma',
    name: 'Emma Collins',
    level: 'Senior Coach',
    years: 10,
    specialty: 'Iron Play & Approach Shots',
    price: 70,
    image: require('../assets/golf-emma-collins.png'),
    description:
      'Emma focuses on accurate iron shots and dependable approaches to the green. Her sessions develop clean contact, distance awareness, and controlled ball flight through targeted practice. During practice matches, she helps players choose realistic targets and approach challenging pin positions with confidence.',
  },
  {
    id: 'michael',
    name: 'Michael Sterling',
    level: 'Senior Coach',
    years: 15,
    specialty: 'Bunker Play & Recovery Shots',
    price: 85,
    image: require('../assets/golf-michael-sterling.png'),
    description:
      'Michael teaches golfers how to handle difficult lies and recover from challenging positions. His sessions cover bunker technique, uneven ground, and controlled shots from the rough. Practice matches focus on recognising safe options and returning the ball to a strong playing position.',
  },
  {
    id: 'isabelle',
    name: 'Isabelle Morgan',
    level: 'Club Coach',
    years: 9,
    specialty: 'Swing Rhythm & Ball Control',
    price: 65,
    image: require('../assets/golf-isabelle-morgan.png'),
    description:
      'Isabelle helps golfers develop a smoother rhythm and a more controlled swing. Her coaching combines tempo exercises with practical work on accuracy and consistent ball striking. During practice matches, she encourages players to maintain their routine and adapt their shots to changing conditions.',
  },
];
export const clubs = [
  { name: 'Lob Wedge', max: 20, image: require('../assets/golf-lob-wedge.png') },
  { name: 'Sand Wedge', max: 40, image: require('../assets/golf-sand-wedge.png') },
  { name: 'Gap Wedge', max: 60, image: require('../assets/golf-gap-wedge.png') },
  {
    name: 'Pitching Wedge',
    max: 90,
    image: require('../assets/golf-pitching-wedge.png'),
  },
  { name: '9-Iron', max: 110, image: require('../assets/golf-nine-iron.png') },
  { name: '8-Iron', max: 125, image: require('../assets/golf-eight-iron.png') },
  { name: '7-Iron', max: 140, image: require('../assets/golf-seven-iron.png') },
  { name: '6-Iron', max: 155, image: require('../assets/golf-six-iron.png') },
  { name: '5-Iron', max: 170, image: require('../assets/golf-five-iron.png') },
  { name: '4-Iron', max: 185, image: require('../assets/golf-four-iron.png') },
  { name: '4-Hybrid', max: 200, image: require('../assets/golf-four-hybrid.png') },
  { name: '3-Hybrid', max: 215, image: require('../assets/golf-three-hybrid.png') },
  { name: '7-Wood', max: 230, image: require('../assets/golf-seven-wood.png') },
  { name: '5-Wood', max: 245, image: require('../assets/golf-five-wood.png') },
  { name: '3-Wood', max: 265, image: require('../assets/golf-three-wood.png') },
  { name: 'Driver', max: Infinity, image: require('../assets/golf-driver.png') },
];
export const offers = [
  {
    id: 'first-round',
    name: 'First Round',
    description: 'A club offer for your first game.',
    image: require('../assets/golf-first-round.png'),
  },
  {
    id: 'course-booking',
    name: 'Course Booking',
    description: 'Member savings on a course reservation.',
    image: require('../assets/golf-course-booking.png'),
  },
  {
    id: 'first-training',
    name: 'First Training',
    description: 'Discover personal coaching with a club offer.',
    image: require('../assets/golf-first-training.png'),
  },
  {
    id: 'dining',
    name: 'After-game Dining',
    description: 'A main-course offer after your round.',
    image: require('../assets/golf-after-game-dining.png'),
  },
  {
    id: 'practice',
    name: 'Practice Match',
    description: 'A member privilege for your next practice match.',
    image: require('../assets/golf-practice-match.png'),
  },
  {
    id: 'cart',
    name: 'Golf Cart',
    description: 'A club offer for golf cart hire.',
    image: require('../assets/golf-golf-cart.png'),
  },
  {
    id: 'range',
    name: 'Driving Range',
    description: 'Make more of your practice at the driving range.',
    image: require('../assets/golf-driving-range.png'),
  },
  {
    id: 'guest',
    name: 'Guest Visit',
    description: 'An invitation to share the club with a guest.',
    image: require('../assets/golf-guest-visit.png'),
  },
];
export const artwork = {
  hero: require('../assets/golf-clubhouse.png'),
  logo: require('../assets/golf-wordmark.png'),
  mark: require('../assets/golf-emblem.png'),
};
export const onboarding = [
  {
    image: require('../assets/golf-onboarding-welcome.png'),
    title: 'Welcome to Your Club',
    body: 'Discover the complex, scan your membership ticket, and check conditions before your visit.',
  },
  {
    image: require('../assets/golf-onboarding-courses.png'),
    title: 'Your Next Round, Reserved',
    body: 'Explore eight courses, choose your tee time, and add a golf cart to your booking.',
  },
  {
    image: require('../assets/golf-onboarding-equipment.png'),
    title: 'Refine Your Game',
    body: 'Book a coach for personal training or a practice match, and track your group’s scores.',
  },
  {
    image: require('../assets/golf-onboarding-coaching.png'),
    title: 'Make Every Visit Count',
    body: 'Find a club for your next shot and explore exclusive member coupons.',
  },
];
