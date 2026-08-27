import { menuItems, popularItems } from '../data/menu';
import type {
  Flavour,
  MenuItem,
  Mood,
  Occasion,
  QuizAnswers,
  Recommendation,
  RecommendationResult,
  Strength,
} from '../types';

/* ==================================================================
   FIND YOUR DRINK — deterministic scoring.

   No API, no randomness: the same answers always produce the same
   pick. Weights are tuned so mood matters most, then flavour and
   strength, then the occasion, with tiny nudges for house favourites
   to break otherwise equal ties in a sensible direction.
   ================================================================== */

const WEIGHTS = {
  mood: 40,
  moodSurprise: 12,
  flavour: 25,
  flavourAny: 8,
  strengthExact: 25,
  strengthAdjacent: 10,
  occasion: 20,
  popular: 4,
  featured: 3,
  ciaoPick: 5,
} as const;

/** Below this, we admit the match is loose rather than pretending. */
const CONFIDENT_SCORE = 62;

/** How close a runner-up must score to the best runner-up before the
 *  variety rule is allowed to reorder it. */
const VARIETY_BAND = 0.75;

const strengthOrder: Strength[] = ['light', 'medium', 'strong'];

function strengthScore(itemStrength: Strength, wanted: Strength): number {
  const distance = Math.abs(strengthOrder.indexOf(itemStrength) - strengthOrder.indexOf(wanted));
  if (distance === 0) return WEIGHTS.strengthExact;
  if (distance === 1) return WEIGHTS.strengthAdjacent;
  return 0;
}

function scoreItem(item: MenuItem, answers: QuizAnswers): number {
  const profile = item.profile;
  if (!profile) return 0;

  let score = 0;

  const mood = answers.mood;
  if (mood && mood !== 'surprise') {
    if (profile.moods.includes(mood as Mood)) score += WEIGHTS.mood;
  } else if (mood === 'surprise') {
    score += WEIGHTS.moodSurprise;
  }

  const flavour = answers.flavour;
  if (flavour && flavour !== 'any') {
    if (profile.flavours.includes(flavour as Flavour)) score += WEIGHTS.flavour;
  } else if (flavour === 'any') {
    score += WEIGHTS.flavourAny;
  }

  if (answers.strength) score += strengthScore(profile.strength, answers.strength as Strength);

  if (answers.occasion && profile.occasions.includes(answers.occasion as Occasion)) {
    score += WEIGHTS.occasion;
  }

  if (item.popular) score += WEIGHTS.popular;
  if (item.featured) score += WEIGHTS.featured;
  if (item.badges?.includes('ciao-pick')) score += WEIGHTS.ciaoPick;

  return score;
}

/* ------------------------------------------------------------------
   Descriptor words shown beneath the result, e.g. "Freskuese · Citrus
   · E lehtë". Chosen to echo what the guest actually asked for.
   ------------------------------------------------------------------ */

const moodLabels: Record<Mood, string> = {
  refreshing: 'Freskuese',
  strong: 'E fortë',
  sweet: 'E ëmbël',
  bitter: 'Amare',
  coffee: 'Kafe',
};

const flavourLabels: Record<Flavour, string> = {
  fruity: 'Frutore',
  citrus: 'Citrus',
  herbal: 'Bimore',
  classic: 'Klasike',
};

const strengthLabels: Record<Strength, string> = {
  light: 'E lehtë',
  medium: 'Mesatare',
  strong: 'E fortë',
};

function describe(item: MenuItem, answers: QuizAnswers): string[] {
  const profile = item.profile;
  if (!profile) return [];

  const mood =
    (answers.mood && profile.moods.includes(answers.mood as Mood)
      ? (answers.mood as Mood)
      : profile.moods[0]) ?? null;

  const flavour =
    (answers.flavour && profile.flavours.includes(answers.flavour as Flavour)
      ? (answers.flavour as Flavour)
      : profile.flavours[0]) ?? null;

  const words = [
    mood ? moodLabels[mood] : null,
    flavour ? flavourLabels[flavour] : null,
    strengthLabels[profile.strength],
  ].filter((word): word is string => Boolean(word));

  // "E fortë" can arrive from both the mood and the strength axis.
  return [...new Set(words)];
}

/* ------------------------------------------------------------------ */

const candidates = menuItems.filter((item) => item.profile !== undefined);

export function recommendDrink(answers: QuizAnswers): RecommendationResult {
  const wantsAlcohol = answers.alcohol !== 'no';

  const pool = candidates.filter((item) => item.profile?.alcoholic === wantsAlcohol);
  const searchable = pool.length > 0 ? pool : candidates;

  const ranked: Recommendation[] = searchable
    .map((item, index) => ({ item, score: scoreItem(item, answers), index }))
    // Ties resolve by the item's position in the menu, so results are stable.
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ item, score }) => ({ item, score, descriptors: describe(item, answers) }));

  const primary = ranked[0] ?? {
    item: popularItems[0] ?? (menuItems[0] as MenuItem),
    score: 0,
    descriptors: [],
  };

  // Prefer alternatives from other categories so the three picks do not
  // read as three versions of the same drink — but only among runners-up
  // that are genuinely close, so variety never promotes a worse match.
  const rest = ranked.slice(1);
  const bestAlternative = rest[0]?.score ?? 0;
  const contenders = rest.filter((entry) => entry.score >= bestAlternative * VARIETY_BAND);
  const otherCategory = contenders.filter((entry) => entry.item.category !== primary.item.category);

  const alternatives = [
    ...otherCategory,
    ...contenders.filter((entry) => !otherCategory.includes(entry)),
    ...rest.filter((entry) => !contenders.includes(entry)),
  ].slice(0, 2);

  return {
    primary,
    alternatives,
    isLooseMatch: primary.score < CONFIDENT_SCORE,
  };
}
