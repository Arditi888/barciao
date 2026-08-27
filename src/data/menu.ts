import type {
  AntipastoItem,
  CategoryId,
  DrinkProfile,
  Flavour,
  MenuCategory,
  MenuItem,
  Mood,
  Occasion,
  Strength,
} from '../types';

/* ==================================================================
   BAR CIAO — MENU
   Every product on the site lives here. To change a price, edit the
   `price` value on one object. Nothing is duplicated in the UI.
   Prices are plain numbers in Lek. Use `null` for "not priced yet".
   ================================================================== */

export const categories: MenuCategory[] = [
  { id: 'popular', label: 'Popular', caption: 'Ato që porositen më shpesh.' },
  { id: 'beer', label: 'Birra', caption: 'Ftohtë, gjithmonë.' },
  { id: 'wine', label: 'Verë', caption: 'Me gotë ose me shishe.' },
  { id: 'cocktails', label: 'Cocktails', caption: 'Aperitiv dhe klasikët.' },
  { id: 'spirits', label: 'Pije Alkoolike', caption: 'Nga rafti.' },
  { id: 'shots', label: 'Shots', caption: 'Një herë, shpejt.' },
  { id: 'soft', label: 'Pa Alkool', caption: 'Freskuese dhe të lehta.' },
  { id: 'coffee', label: 'Kafe & Çaj', caption: 'Nga mëngjesi deri në mbrëmje.' },
  { id: 'antipasti', label: 'Antipasta', caption: 'Për t’u ndarë në tavolinë.' },
  { id: 'cigarettes', label: 'Duhan', caption: 'Në banak.' },
];

/* Compact constructor so each item stays one readable line. */
const p = (
  alcoholic: boolean,
  strength: Strength,
  moods: Mood[],
  flavours: Flavour[],
  occasions: Occasion[],
): DrinkProfile => ({ alcoholic, strength, moods, flavours, occasions });

const EVENING: Occasion[] = ['after-work', 'night-out', 'one-drink'];
const MATCH: Occasion[] = ['football', 'after-work', 'night-out'];
const DAYTIME: Occasion[] = ['coffee-break', 'one-drink'];
const ANYTIME: Occasion[] = [
  'coffee-break',
  'after-work',
  'football',
  'date',
  'night-out',
  'one-drink',
];

/* ------------------------------------------------------------------
   BIRRA
   ------------------------------------------------------------------ */
const beer: MenuItem[] = [
  {
    id: 'estrella-damm-330',
    name: 'Estrella Damm',
    category: 'beer',
    subcategory: 'Lager, Barcelonë',
    size: '330 ml',
    price: 250,
    popular: true,
    featured: true,
    keywords: ['birre', 'beer', 'lager', 'spanjolle'],
    profile: p(true, 'light', ['refreshing'], ['classic'], MATCH),
  },
  {
    id: 'estrella-galicia-330',
    name: 'Estrella Galicia',
    category: 'beer',
    subcategory: 'Lager, Galicia',
    size: '330 ml',
    price: 250,
    keywords: ['birre', 'beer', 'lager'],
    profile: p(true, 'light', ['refreshing'], ['classic'], MATCH),
  },
  {
    id: 'peroni-nastro-330',
    name: 'Peroni Nastro Azzurro',
    category: 'beer',
    subcategory: 'Lager italiane',
    size: '330 ml',
    price: 250,
    keywords: ['birre', 'beer', 'lager', 'italiane'],
    profile: p(true, 'light', ['refreshing'], ['classic'], MATCH),
  },
  {
    id: 'corona-330',
    name: 'Corona',
    category: 'beer',
    subcategory: 'Lager, Meksikë',
    size: '330 ml',
    price: 350,
    popular: true,
    keywords: ['birre', 'beer', 'lager', 'limon'],
    profile: p(true, 'light', ['refreshing'], ['citrus', 'classic'], MATCH),
  },
  {
    id: 'estrella-galicia-500',
    name: 'Estrella Galicia',
    category: 'beer',
    subcategory: 'Lager, Galicia',
    size: '500 ml',
    price: 200,
    keywords: ['birre', 'beer', 'lager', 'e madhe'],
    profile: p(true, 'medium', ['refreshing'], ['classic'], MATCH),
  },
];

/* ------------------------------------------------------------------
   VERË
   ------------------------------------------------------------------ */
const wine: MenuItem[] = [
  {
    id: 'wine-it-white-250',
    name: 'Verë Italiane e bardhë',
    category: 'wine',
    subcategory: 'Me gotë',
    size: '250 ml',
    price: 200,
    keywords: ['vere', 'wine', 'white', 'bardhe', 'italiane'],
    profile: p(true, 'medium', ['refreshing'], ['fruity', 'citrus'], [
      'date',
      'after-work',
      'one-drink',
    ]),
  },
  {
    id: 'wine-it-red-250',
    name: 'Verë Italiane e kuqe',
    category: 'wine',
    subcategory: 'Me gotë',
    size: '250 ml',
    price: 200,
    keywords: ['vere', 'wine', 'red', 'kuqe', 'italiane'],
    profile: p(true, 'medium', ['strong'], ['classic'], ['date', 'after-work', 'one-drink']),
  },
  {
    id: 'wine-white-750-a',
    name: 'Verë e bardhë',
    category: 'wine',
    subcategory: 'Shishe',
    size: '750 ml',
    price: 2000,
    keywords: ['vere', 'wine', 'white', 'bardhe', 'shishe'],
    profile: p(true, 'medium', ['refreshing'], ['fruity', 'citrus'], ['date', 'night-out']),
  },
  {
    id: 'wine-white-750-b',
    name: 'Verë e bardhë',
    category: 'wine',
    subcategory: 'Shishe',
    size: '750 ml',
    price: 2500,
    keywords: ['vere', 'wine', 'white', 'bardhe', 'shishe'],
    profile: p(true, 'medium', ['refreshing'], ['fruity', 'citrus'], ['date', 'night-out']),
  },
  {
    id: 'wine-red-750-a',
    name: 'Verë e kuqe',
    category: 'wine',
    subcategory: 'Shishe',
    size: '750 ml',
    price: 2000,
    keywords: ['vere', 'wine', 'red', 'kuqe', 'shishe'],
    profile: p(true, 'medium', ['strong'], ['classic'], ['date', 'night-out']),
  },
  {
    id: 'wine-red-750-b',
    name: 'Verë e kuqe',
    category: 'wine',
    subcategory: 'Shishe',
    size: '750 ml',
    price: 2500,
    keywords: ['vere', 'wine', 'red', 'kuqe', 'shishe'],
    profile: p(true, 'medium', ['strong'], ['classic'], ['date', 'night-out']),
  },
];

/* ------------------------------------------------------------------
   COCKTAILS
   Placeholder content — prices are intentionally `null` until the
   final cocktail list is confirmed. Fill in `price` to publish one.
   ------------------------------------------------------------------ */
const cocktails: MenuItem[] = [
  {
    id: 'aperol-spritz',
    name: 'Aperol Spritz',
    category: 'cocktails',
    subcategory: 'Aperitiv',
    price: null,
    description: 'Aperol, prosecco, soda dhe një feta portokalli.',
    badges: ['ciao-pick', 'placeholder'],
    popular: true,
    featured: true,
    keywords: ['spritz', 'aperol', 'aperitiv', 'portokalli'],
    profile: p(true, 'light', ['refreshing', 'bitter'], ['citrus', 'fruity'], [
      'after-work',
      'date',
      'one-drink',
    ]),
  },
  {
    id: 'gin-tonic',
    name: 'Gin & Tonic',
    category: 'cocktails',
    subcategory: 'Klasik',
    price: null,
    description: 'Gin, tonik dhe akull. Zgjidh ginin nga rafti.',
    badges: ['placeholder'],
    popular: true,
    featured: true,
    keywords: ['gin', 'tonic', 'tonik', 'klasik'],
    profile: p(true, 'medium', ['refreshing', 'bitter'], ['herbal', 'citrus'], EVENING),
  },
  {
    id: 'vodka-red-bull',
    name: 'Vodka Red Bull',
    category: 'cocktails',
    subcategory: 'Long drink',
    price: null,
    badges: ['placeholder'],
    keywords: ['vodka', 'red bull', 'energji'],
    profile: p(true, 'strong', ['sweet', 'strong'], ['fruity'], ['night-out']),
  },
  {
    id: 'hugo',
    name: 'Hugo',
    category: 'cocktails',
    subcategory: 'Aperitiv',
    price: null,
    description: 'Shurup shtogu, prosecco, soda dhe mente.',
    badges: ['placeholder'],
    keywords: ['hugo', 'shtog', 'mente', 'aperitiv'],
    profile: p(true, 'light', ['refreshing', 'sweet'], ['herbal', 'fruity'], [
      'date',
      'after-work',
      'one-drink',
    ]),
  },
  {
    id: 'negroni',
    name: 'Negroni',
    category: 'cocktails',
    subcategory: 'Klasik italian',
    price: null,
    description: 'Gin, vermouth i kuq dhe Campari. Në pjesë të barabarta.',
    badges: ['placeholder'],
    featured: true,
    keywords: ['negroni', 'campari', 'gin', 'vermouth', 'klasik'],
    profile: p(true, 'strong', ['bitter', 'strong'], ['herbal', 'classic'], [
      'after-work',
      'date',
      'night-out',
    ]),
  },
  {
    id: 'campari-spritz',
    name: 'Campari Spritz',
    category: 'cocktails',
    subcategory: 'Aperitiv',
    price: null,
    badges: ['placeholder'],
    keywords: ['campari', 'spritz', 'aperitiv'],
    profile: p(true, 'light', ['bitter', 'refreshing'], ['citrus'], [
      'after-work',
      'one-drink',
      'date',
    ]),
  },
];

/* ------------------------------------------------------------------
   PIJE ALKOOLIKE
   ------------------------------------------------------------------ */
const spirits: MenuItem[] = [
  {
    id: 'amaro-dc',
    name: 'Amaro DC',
    category: 'spirits',
    subcategory: 'Amaro',
    size: '50 ml',
    price: 300,
    keywords: ['amaro', 'digestiv', 'bimor'],
    profile: p(true, 'medium', ['bitter'], ['herbal'], ['after-work', 'night-out']),
  },
  {
    id: 'bacardi-rum',
    name: 'Bacardi Rum',
    category: 'spirits',
    subcategory: 'Rum',
    size: '50 ml',
    price: 300,
    keywords: ['rum', 'bacardi'],
    profile: p(true, 'strong', ['strong', 'sweet'], ['classic'], EVENING),
  },
  {
    id: 'bombay-gin',
    name: 'Bombay Sapphire',
    category: 'spirits',
    subcategory: 'Gin',
    size: '50 ml',
    price: 300,
    keywords: ['gin', 'bombay', 'sapphire'],
    profile: p(true, 'strong', ['strong'], ['herbal', 'citrus'], EVENING),
  },
  {
    id: 'disaronno',
    name: 'Disaronno',
    category: 'spirits',
    subcategory: 'Amaretto',
    size: '50 ml',
    price: 350,
    keywords: ['amaretto', 'disaronno', 'embel'],
    profile: p(true, 'medium', ['sweet'], ['classic'], ['date', 'one-drink', 'night-out']),
  },
  {
    id: 'fernet',
    name: 'Fernet Branca',
    category: 'spirits',
    subcategory: 'Amaro',
    size: '100 ml',
    price: 300,
    keywords: ['fernet', 'amaro', 'digestiv', 'bimor'],
    profile: p(true, 'strong', ['bitter', 'strong'], ['herbal'], ['after-work', 'night-out']),
  },
  {
    id: 'glenfiddich-12',
    name: 'Glenfiddich 12yo',
    category: 'spirits',
    subcategory: 'Single Malt Whisky',
    size: '50 ml',
    price: 650,
    badges: ['premium'],
    keywords: ['whisky', 'whiskey', 'scotch', 'malt', 'glenfiddich'],
    profile: p(true, 'strong', ['strong'], ['classic'], ['date', 'night-out', 'one-drink']),
  },
  {
    id: 'hendricks-gin',
    name: "Hendrick's Gin",
    category: 'spirits',
    subcategory: 'Gin',
    size: '50 ml',
    price: 400,
    badges: ['premium'],
    keywords: ['gin', 'hendricks', 'kastravec'],
    profile: p(true, 'strong', ['strong', 'refreshing'], ['herbal'], EVENING),
  },
  {
    id: 'hennessy',
    name: 'Hennessy',
    category: 'spirits',
    subcategory: 'Cognac',
    size: '50 ml',
    price: 550,
    badges: ['premium'],
    keywords: ['konjak', 'cognac', 'hennessy', 'brandy'],
    profile: p(true, 'strong', ['strong'], ['classic'], ['date', 'night-out']),
  },
  {
    id: 'jb',
    name: 'J&B',
    category: 'spirits',
    subcategory: 'Blended Scotch',
    size: '50 ml',
    price: 300,
    keywords: ['whisky', 'whiskey', 'scotch', 'jb'],
    profile: p(true, 'strong', ['strong'], ['classic'], EVENING),
  },
  {
    id: 'jack-daniels',
    name: "Jack Daniel's",
    category: 'spirits',
    subcategory: 'Tennessee Whiskey',
    size: '50 ml',
    price: 300,
    keywords: ['whisky', 'whiskey', 'jack', 'bourbon'],
    profile: p(true, 'strong', ['strong'], ['classic'], MATCH),
  },
  {
    id: 'jagermeister',
    name: 'Jägermeister',
    category: 'spirits',
    subcategory: 'Liker bimor',
    size: '50 ml',
    price: 350,
    keywords: ['jager', 'jagermeister', 'bimor'],
    profile: p(true, 'strong', ['bitter', 'sweet'], ['herbal'], ['night-out', 'football']),
  },
  {
    id: 'jameson',
    name: 'Jameson',
    category: 'spirits',
    subcategory: 'Irish Whiskey',
    size: '50 ml',
    price: 300,
    badges: ['ciao-pick'],
    popular: true,
    featured: true,
    keywords: ['whisky', 'whiskey', 'irish', 'jameson'],
    profile: p(true, 'strong', ['strong'], ['classic'], MATCH),
  },
  {
    id: 'johnnie-walker-red',
    name: 'Johnnie Walker Red',
    category: 'spirits',
    subcategory: 'Blended Scotch',
    size: '50 ml',
    price: 250,
    keywords: ['whisky', 'whiskey', 'scotch', 'johnnie', 'walker'],
    profile: p(true, 'strong', ['strong'], ['classic'], MATCH),
  },
  {
    id: 'konjak-skenderbeu',
    name: 'Konjak Skënderbeu',
    category: 'spirits',
    subcategory: 'Brandy shqiptar',
    size: '50 ml',
    price: 100,
    keywords: ['konjak', 'skenderbeu', 'brandy', 'shqiptar'],
    profile: p(true, 'strong', ['strong', 'sweet'], ['classic'], ['one-drink', 'after-work']),
  },
  {
    id: 'martini',
    name: 'Martini',
    category: 'spirits',
    subcategory: 'Vermouth',
    size: '50 ml',
    price: 250,
    keywords: ['martini', 'vermouth', 'aperitiv'],
    profile: p(true, 'light', ['bitter', 'sweet'], ['herbal'], ['after-work', 'date', 'one-drink']),
  },
  {
    id: 'raki-rrushi',
    name: 'Raki Rrushi',
    category: 'spirits',
    subcategory: 'Raki tradicionale',
    size: '50 ml',
    price: 70,
    popular: true,
    keywords: ['raki', 'rrush', 'tradicionale', 'shqiptare'],
    profile: p(true, 'strong', ['strong'], ['classic'], ['one-drink', 'after-work', 'football']),
  },
  {
    id: 'tanqueray-gin',
    name: 'Tanqueray Gin',
    category: 'spirits',
    subcategory: 'Gin',
    size: '50 ml',
    price: 350,
    keywords: ['gin', 'tanqueray'],
    profile: p(true, 'strong', ['strong'], ['herbal', 'citrus'], EVENING),
  },
  {
    id: 'tequila',
    name: 'Tequila',
    category: 'spirits',
    subcategory: 'Agave',
    size: '50 ml',
    price: 250,
    keywords: ['tequila', 'agave'],
    profile: p(true, 'strong', ['strong'], ['citrus'], ['night-out']),
  },
  {
    id: 'uzo',
    name: 'Uzo',
    category: 'spirits',
    subcategory: 'Anason',
    size: '50 ml',
    price: 200,
    keywords: ['uzo', 'ouzo', 'anason'],
    profile: p(true, 'strong', ['strong'], ['herbal'], ['after-work', 'one-drink']),
  },
];

/* ------------------------------------------------------------------
   SHOTS
   ------------------------------------------------------------------ */
const shots: MenuItem[] = [
  {
    id: 'shot-tequila',
    name: 'Tequila',
    category: 'shots',
    size: '40 ml',
    price: 200,
    keywords: ['shot', 'tequila'],
    profile: p(true, 'strong', ['strong'], ['citrus'], ['night-out']),
  },
  {
    id: 'shot-tanqueray',
    name: 'Tanqueray',
    category: 'shots',
    size: '40 ml',
    price: 250,
    keywords: ['shot', 'gin', 'tanqueray'],
    profile: p(true, 'strong', ['strong'], ['herbal'], ['night-out']),
  },
  {
    id: 'shot-jager',
    name: 'Jäger',
    category: 'shots',
    size: '40 ml',
    price: 250,
    popular: true,
    keywords: ['shot', 'jager', 'jagermeister'],
    profile: p(true, 'strong', ['bitter', 'sweet'], ['herbal'], ['night-out', 'football']),
  },
  {
    id: 'shot-jack-daniels',
    name: "Jack Daniel's",
    category: 'shots',
    size: '40 ml',
    price: 230,
    keywords: ['shot', 'whiskey', 'jack'],
    profile: p(true, 'strong', ['strong'], ['classic'], ['night-out', 'football']),
  },
  {
    id: 'shot-fernet',
    name: 'Fernet',
    category: 'shots',
    size: '40 ml',
    price: 80,
    keywords: ['shot', 'fernet', 'amaro'],
    profile: p(true, 'strong', ['bitter'], ['herbal'], ['night-out', 'after-work']),
  },
];

/* ------------------------------------------------------------------
   PA ALKOOL
   ------------------------------------------------------------------ */
const soft: MenuItem[] = [
  {
    id: 'leng-frutash-bio',
    name: 'Lëng frutash BIO',
    category: 'soft',
    size: '250 ml',
    price: 250,
    keywords: ['leng', 'juice', 'fruta', 'bio'],
    profile: p(false, 'light', ['sweet', 'refreshing'], ['fruity'], DAYTIME),
  },
  {
    id: 'red-bull',
    name: 'Red Bull',
    category: 'soft',
    subcategory: 'Pije energjike',
    size: '250 ml',
    price: 250,
    keywords: ['red bull', 'energji', 'energy'],
    profile: p(false, 'light', ['sweet'], ['fruity'], ['night-out', 'football']),
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    category: 'soft',
    size: '330 ml',
    price: 150,
    popular: true,
    keywords: ['cola', 'coca', 'kola'],
    profile: p(false, 'light', ['sweet', 'refreshing'], ['classic'], ANYTIME),
  },
  {
    id: 'fanta',
    name: 'Fanta',
    category: 'soft',
    size: '330 ml',
    price: 150,
    keywords: ['fanta', 'portokall'],
    profile: p(false, 'light', ['sweet'], ['fruity', 'citrus'], ANYTIME),
  },
  {
    id: 'b52',
    name: 'B52',
    category: 'soft',
    subcategory: 'Pije energjike',
    size: '250 ml',
    price: 170,
    keywords: ['b52', 'energji', 'energy'],
    profile: p(false, 'light', ['sweet'], ['fruity'], ['night-out', 'football']),
  },
  {
    id: 'bravo',
    name: 'Bravo',
    category: 'soft',
    size: '330 ml',
    price: 150,
    keywords: ['bravo', 'leng', 'fruta'],
    profile: p(false, 'light', ['sweet'], ['fruity'], DAYTIME),
  },
  {
    id: 'ice-tea',
    name: 'Ice Tea',
    category: 'soft',
    size: '330 ml',
    price: 150,
    keywords: ['ice tea', 'caj i ftohte'],
    profile: p(false, 'light', ['refreshing', 'sweet'], ['citrus', 'fruity'], DAYTIME),
  },
  {
    id: 'lemon-soda',
    name: 'Lemon Soda',
    category: 'soft',
    size: '330 ml',
    price: 150,
    keywords: ['lemon', 'limon', 'soda'],
    profile: p(false, 'light', ['refreshing', 'bitter'], ['citrus'], DAYTIME),
  },
  {
    id: 'orange-soda',
    name: 'Orange Soda',
    category: 'soft',
    size: '330 ml',
    price: 150,
    keywords: ['orange', 'portokall', 'soda'],
    profile: p(false, 'light', ['refreshing', 'sweet'], ['citrus', 'fruity'], DAYTIME),
  },
  {
    id: 'schweppes',
    name: 'Schweppes',
    category: 'soft',
    subcategory: 'Tonik',
    size: '125 ml',
    price: 120,
    keywords: ['schweppes', 'tonik', 'tonic'],
    profile: p(false, 'light', ['bitter', 'refreshing'], ['citrus'], DAYTIME),
  },
  {
    id: 'crodino',
    name: 'Crodino',
    category: 'soft',
    subcategory: 'Aperitiv pa alkool',
    size: '100 ml',
    price: 140,
    badges: ['ciao-pick'],
    keywords: ['crodino', 'aperitiv', 'pa alkool', 'analcolico'],
    profile: p(false, 'light', ['bitter', 'refreshing'], ['citrus', 'herbal'], [
      'after-work',
      'date',
      'one-drink',
    ]),
  },
  {
    id: 'uje-vitamina',
    name: 'Ujë me Vitamina',
    category: 'soft',
    size: '330 ml',
    price: 120,
    keywords: ['uje', 'vitamina', 'water'],
    profile: p(false, 'light', ['refreshing'], ['fruity'], DAYTIME),
  },
  {
    id: 'uje-mineral',
    name: 'Ujë Mineral',
    category: 'soft',
    size: '500 ml',
    price: 60,
    popular: true,
    keywords: ['uje', 'water', 'natyral'],
    profile: p(false, 'light', ['refreshing'], ['classic'], ANYTIME),
  },
  {
    id: 'uje-gazuar',
    name: 'Ujë i Gazuar',
    category: 'soft',
    size: '500 ml',
    price: 80,
    keywords: ['uje', 'gazuar', 'sparkling', 'water'],
    profile: p(false, 'light', ['refreshing'], ['classic'], ANYTIME),
  },
];

/* ------------------------------------------------------------------
   KAFE & ÇAJ
   ------------------------------------------------------------------ */
const coffee: MenuItem[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'coffee',
    price: 60,
    description: 'Kafe klasike italiane me aromë intensive.',
    popular: true,
    featured: true,
    badges: ['ciao-pick'],
    keywords: ['kafe', 'coffee', 'espresso'],
    profile: p(false, 'strong', ['coffee', 'bitter'], ['classic'], ['coffee-break', 'one-drink']),
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    category: 'coffee',
    price: 70,
    popular: true,
    keywords: ['kafe', 'coffee', 'macchiato', 'qumesht'],
    profile: p(false, 'medium', ['coffee'], ['classic'], ['coffee-break', 'one-drink']),
  },
  {
    id: 'macchiato-madhe',
    name: 'Macchiato e madhe',
    category: 'coffee',
    price: 100,
    keywords: ['kafe', 'coffee', 'macchiato', 'e madhe'],
    profile: p(false, 'medium', ['coffee'], ['classic'], ['coffee-break']),
  },
  {
    id: 'cappuccino-bustine',
    name: 'Cappuccino me bustine',
    category: 'coffee',
    price: 160,
    keywords: ['kafe', 'coffee', 'cappuccino'],
    profile: p(false, 'light', ['coffee', 'sweet'], ['classic'], ['coffee-break']),
  },
  {
    id: 'cappuccino-kafe',
    name: 'Cappuccino me kafe',
    category: 'coffee',
    price: 160,
    popular: true,
    keywords: ['kafe', 'coffee', 'cappuccino'],
    profile: p(false, 'medium', ['coffee'], ['classic'], ['coffee-break']),
  },
  {
    id: 'cappuccino-ftohte',
    name: 'Cappuccino i ftohtë',
    category: 'coffee',
    price: 190,
    keywords: ['kafe', 'coffee', 'cappuccino', 'i ftohte', 'iced'],
    profile: p(false, 'medium', ['coffee', 'refreshing'], ['classic'], ['coffee-break']),
  },
  {
    id: 'caj',
    name: 'Çaj',
    category: 'coffee',
    price: 70,
    options: ['Jeshil', 'Fruta Pylli', 'Luleshtrydhe', 'Mollë & Kanellë', 'Limoni'],
    keywords: ['caj', 'tea', 'jeshil', 'limon'],
    profile: p(false, 'light', ['refreshing'], ['herbal', 'fruity'], ['coffee-break', 'one-drink']),
  },
  {
    id: 'cokollate-ngrohte',
    name: 'Çokollatë e ngrohtë',
    category: 'coffee',
    price: 160,
    keywords: ['cokollate', 'chocolate', 'ngrohte'],
    profile: p(false, 'light', ['sweet'], ['classic'], ['coffee-break']),
  },
  {
    id: 'kakao-madhe',
    name: 'Kakao e madhe',
    category: 'coffee',
    price: 160,
    keywords: ['kakao', 'cocoa', 'e madhe'],
    profile: p(false, 'light', ['sweet'], ['classic'], ['coffee-break']),
  },
  {
    id: 'kakao-vogel',
    name: 'Kakao e vogël',
    category: 'coffee',
    price: 80,
    keywords: ['kakao', 'cocoa', 'e vogel'],
    profile: p(false, 'light', ['sweet'], ['classic'], ['coffee-break']),
  },
  {
    id: 'frape',
    name: 'Frape',
    category: 'coffee',
    price: 190,
    popular: true,
    keywords: ['frape', 'frappe', 'kafe e ftohte'],
    profile: p(false, 'medium', ['coffee', 'sweet', 'refreshing'], ['classic'], [
      'coffee-break',
      'one-drink',
    ]),
  },
];

/* ------------------------------------------------------------------
   DUHAN
   ------------------------------------------------------------------ */
const cigarettes: MenuItem[] = [
  {
    id: 'lucky-strike',
    name: 'Lucky Strike',
    category: 'cigarettes',
    price: 500,
    keywords: ['duhan', 'cigare'],
  },
  { id: 'marlboro', name: 'Marlboro', category: 'cigarettes', price: 450, keywords: ['duhan', 'cigare'] },
  {
    id: 'marlboro-gold',
    name: 'Marlboro Gold',
    category: 'cigarettes',
    price: 480,
    keywords: ['duhan', 'cigare'],
  },
  {
    id: 'marlboro-black',
    name: 'Marlboro Black',
    category: 'cigarettes',
    price: 580,
    keywords: ['duhan', 'cigare'],
  },
  {
    id: 'toscanello',
    name: 'Toscanello',
    category: 'cigarettes',
    price: 900,
    keywords: ['duhan', 'puro', 'cigare'],
  },
];

/* ------------------------------------------------------------------
   ANTIPASTA
   Boards rather than single products — they render as visual cards.
   ------------------------------------------------------------------ */
export const antipasti: AntipastoItem[] = [
  {
    id: 'antipasto-birra-snack',
    name: 'Snack',
    pairing: 'Birra',
    serves: '2 persona',
    contents: ['Salçiçe e thatë', 'Djathë i bardhë', 'Patatina'],
    price: 500,
    tier: 'base',
  },
  {
    id: 'antipasto-birra-mix',
    name: 'Mix',
    pairing: 'Birra',
    serves: '2 persona',
    contents: ['Sallam', 'Djathë Cheddar', 'Ullinj jeshil', 'Krikera të kripur'],
    price: 700,
    tier: 'mid',
  },
  {
    id: 'antipasto-birra-premium',
    name: 'Premium',
    pairing: 'Birra',
    serves: '2 persona',
    contents: ['Mix djathërash', 'Sallam', 'Proshutë crudo', 'Nachos me salcë'],
    price: 1000,
    tier: 'premium',
  },
  {
    id: 'antipasto-vere-light',
    name: 'Light',
    pairing: 'Verë',
    serves: '2 persona',
    contents: ['Djathë i bardhë', 'Ullinj', 'Patatina'],
    price: 500,
    tier: 'base',
  },
  {
    id: 'antipasto-vere-classico',
    name: 'Classico',
    pairing: 'Verë',
    serves: '2 persona',
    contents: ['Parmesan', 'Proshutë crudo', 'Ullinj jeshil', 'Pomodorini'],
    price: 700,
    tier: 'mid',
  },
  {
    id: 'antipasto-vere-premium',
    name: 'Premium',
    pairing: 'Verë',
    serves: '2 persona',
    contents: ['Trio djathërash', 'Proshutë & Speck', 'Rrush i thatë', 'Bukë artizanale'],
    price: 1000,
    tier: 'premium',
  },
];

/* ==================================================================
   DERIVED COLLECTIONS
   ================================================================== */

export const menuItems: MenuItem[] = [
  ...beer,
  ...wine,
  ...cocktails,
  ...spirits,
  ...shots,
  ...soft,
  ...coffee,
  ...cigarettes,
];

const itemsById = new Map(menuItems.map((item) => [item.id, item]));

export function getMenuItem(id: string): MenuItem | undefined {
  return itemsById.get(id);
}

export const popularItems: MenuItem[] = menuItems.filter((item) => item.popular);

export function itemsInCategory(category: CategoryId): MenuItem[] {
  if (category === 'popular') return popularItems;
  return menuItems.filter((item) => item.category === category);
}

export function categoryLabel(id: CategoryId): string {
  return categories.find((category) => category.id === id)?.label ?? id;
}

/** Antipasti grouped by the drink they are built around. */
export function antipastiByPairing(): { pairing: string; boards: AntipastoItem[] }[] {
  const pairings = [...new Set(antipasti.map((board) => board.pairing))];
  return pairings.map((pairing) => ({
    pairing,
    boards: antipasti.filter((board) => board.pairing === pairing),
  }));
}

/* ------------------------------------------------------------------
   CIAO FAVOURITES — the homepage selection. Prices are read from the
   objects above, never re-typed, so one edit updates both places.
   ------------------------------------------------------------------ */
export interface FeatureCard {
  id: string;
  name: string;
  meta: string;
  price: number | null;
  description?: string;
  category: CategoryId;
}

const favouriteItemIds = ['aperol-spritz', 'gin-tonic', 'estrella-damm-330', 'espresso', 'jameson'];
const favouriteBoardId = 'antipasto-vere-classico';

function favouriteFromItem(id: string): FeatureCard[] {
  const item = itemsById.get(id);
  if (!item) return [];
  return [
    {
      id: item.id,
      name: item.name,
      meta: item.subcategory ?? categoryLabel(item.category),
      price: item.price,
      description: item.description,
      category: item.category,
    },
  ];
}

function favouriteFromBoard(id: string): FeatureCard[] {
  const board = antipasti.find((entry) => entry.id === id);
  if (!board) return [];
  return [
    {
      id: board.id,
      name: `Antipasto ${board.name}`,
      meta: `Antipasta • ${board.serves}`,
      price: board.price,
      description: board.contents.join(' · '),
      category: 'antipasti',
    },
  ];
}

export const ciaoFavourites: FeatureCard[] = [
  ...favouriteItemIds.flatMap(favouriteFromItem),
  ...favouriteFromBoard(favouriteBoardId),
];
