import { business } from '../data/business';

/** Price split into parts so the unit can be styled down beside it. */
export function priceParts(price: number | null | undefined): { amount: string; unit: string } {
  if (price === null || price === undefined) return { amount: '—', unit: '' };
  return { amount: price.toLocaleString('sq-AL'), unit: business.currency };
}

/** Combining diacritical marks, stripped after an NFD decomposition. */
const COMBINING_MARKS = /[̀-ͯ]/g;

/** Folds Albanian diacritics so a search for "cokollate" finds "Çokollatë". */
export function normalise(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(COMBINING_MARKS, '').trim();
}

/** Conditional className joiner. */
export function cx(...values: (string | false | null | undefined)[]): string {
  return values.filter(Boolean).join(' ');
}
