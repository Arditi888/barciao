/* ------------------------------------------------------------------
   MENU
   ------------------------------------------------------------------ */

export type CategoryId =
  | 'popular'
  | 'beer'
  | 'wine'
  | 'cocktails'
  | 'spirits'
  | 'shots'
  | 'soft'
  | 'coffee'
  | 'antipasti'
  | 'cigarettes';

export type Badge = 'popular' | 'ciao-pick' | 'new' | 'premium' | 'placeholder';

/** Signals used by the recommendation engine. Optional on purpose —
 *  an item without a profile simply never surfaces as a suggestion. */
export type Mood = 'refreshing' | 'strong' | 'sweet' | 'bitter' | 'coffee';
export type Flavour = 'fruity' | 'citrus' | 'herbal' | 'classic';
export type Strength = 'light' | 'medium' | 'strong';
export type Occasion = 'coffee-break' | 'after-work' | 'football' | 'date' | 'night-out' | 'one-drink';

export interface DrinkProfile {
  alcoholic: boolean;
  moods: Mood[];
  flavours: Flavour[];
  strength: Strength;
  occasions: Occasion[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  subcategory?: string;
  /** Serving size as printed on the menu, e.g. "50 ml". */
  size?: string;
  /** Lek. `null` means "not priced yet" and renders as a placeholder. */
  price: number | null;
  description?: string;
  /** Variants sharing one price, e.g. tea flavours. */
  options?: string[];
  badges?: Badge[];
  popular?: boolean;
  featured?: boolean;
  /** Extra words the search should match, e.g. "gin" for Bombay. */
  keywords?: string[];
  profile?: DrinkProfile;
  image?: string;
}

/** Antipasti are boards, not single products — they carry a component list. */
export interface AntipastoItem {
  id: string;
  name: string;
  /** "Birra" or "Verë" — which drink the board is built around. */
  pairing: string;
  serves: string;
  contents: string[];
  price: number;
  tier: 'base' | 'mid' | 'premium';
}

export interface MenuCategory {
  id: CategoryId;
  /** Albanian label shown to guests. */
  label: string;
  /** Short line used on the category header. */
  caption?: string;
}

/* ------------------------------------------------------------------
   EVENTS
   ------------------------------------------------------------------ */

export type EventType = 'sport' | 'music' | 'special';

export interface EventTeams {
  home: string;
  away: string;
  competition?: string;
}

export interface CiaoEvent {
  id: string;
  title: string;
  type: EventType;
  /** ISO date, `YYYY-MM-DD`, local to Tirana. */
  date: string;
  /** 24h `HH:MM`, local to Tirana. */
  time: string;
  description?: string;
  image?: string;
  featured?: boolean;
  teams?: EventTeams;
  /** Optional in-page action, e.g. link to the menu. */
  cta?: { label: string; to: string };
}

export type EventBucket = 'today' | 'tomorrow' | 'week' | 'later' | 'past';

/* ------------------------------------------------------------------
   OPENING HOURS
   ------------------------------------------------------------------ */

/** 0 = Sunday … 6 = Saturday, matching `Date.getDay()`. */
export type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface OpeningInterval {
  /** `HH:MM`. */
  open: string;
  /** `HH:MM`. "00:00" is read as midnight at the end of that day. */
  close: string;
}

export type OpeningHours = Record<WeekdayIndex, OpeningInterval | null>;

export type OpeningState = 'open' | 'closing-soon' | 'closed';

export interface OpeningStatus {
  state: OpeningState;
  /** Ready-to-render Albanian sentence. */
  label: string;
  /** `HH:MM` the bar closes, when open. */
  closesAt?: string;
  /** `HH:MM` the bar next opens, when closed. */
  opensAt?: string;
  /** Minutes until close — drives the "closing soon" threshold. */
  minutesUntilClose?: number;
}

/* ------------------------------------------------------------------
   FIND YOUR DRINK
   ------------------------------------------------------------------ */

export type QuizAnswerValue = string;

export interface QuizOption {
  value: QuizAnswerValue;
  label: string;
  hint?: string;
}

export interface QuizQuestion {
  id: 'alcohol' | 'mood' | 'flavour' | 'strength' | 'occasion';
  question: string;
  caption?: string;
  options: QuizOption[];
}

export type QuizAnswers = Partial<Record<QuizQuestion['id'], QuizAnswerValue>>;

export interface Recommendation {
  item: MenuItem;
  score: number;
  /** Three descriptor words shown under the result, e.g. "Freskuese · Citrus". */
  descriptors: string[];
}

export interface RecommendationResult {
  primary: Recommendation;
  alternatives: Recommendation[];
  /** True when nothing scored well and we fell back to a house favourite. */
  isLooseMatch: boolean;
}
