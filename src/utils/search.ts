import { antipasti, categoryLabel, menuItems } from '../data/menu';
import type { AntipastoItem, MenuItem } from '../types';
import { normalise } from './format';

/* ==================================================================
   Menu search. Matches on name, type, category, description, serving
   size and hand-written keywords, so "gin" finds Bombay, Hendrick's,
   Tanqueray and Gin & Tonic alike.
   ================================================================== */

interface Indexed<T> {
  entry: T;
  haystack: string;
  name: string;
}

function indexItem(item: MenuItem): Indexed<MenuItem> {
  const parts = [
    item.name,
    item.subcategory ?? '',
    categoryLabel(item.category),
    item.description ?? '',
    item.size ?? '',
    ...(item.options ?? []),
    ...(item.keywords ?? []),
  ];

  return { entry: item, haystack: normalise(parts.join(' ')), name: normalise(item.name) };
}

function indexBoard(board: AntipastoItem): Indexed<AntipastoItem> {
  const parts = [
    board.name,
    'antipasto',
    'antipasta',
    board.pairing,
    board.serves,
    ...board.contents,
  ];

  return { entry: board, haystack: normalise(parts.join(' ')), name: normalise(board.name) };
}

const itemIndex = menuItems.map(indexItem);
const boardIndex = antipasti.map(indexBoard);

/** Every term must appear somewhere, so "gin tonic" narrows rather
 *  than widens. Name matches rank above description matches. */
function match<T>(records: Indexed<T>[], terms: string[]): T[] {
  return records
    .flatMap((record, index) => {
      if (!terms.every((term) => record.haystack.includes(term))) return [];

      const startsWithTerm = terms.some((term) => record.name.startsWith(term));
      const inName = terms.some((term) => record.name.includes(term));
      const rank = startsWithTerm ? 0 : inName ? 1 : 2;

      return [{ entry: record.entry, rank, index }];
    })
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map((result) => result.entry);
}

export interface SearchResults {
  items: MenuItem[];
  boards: AntipastoItem[];
  total: number;
}

export function searchMenu(query: string): SearchResults {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return { items: [], boards: [], total: 0 };

  const items = match(itemIndex, terms);
  const boards = match(boardIndex, terms);

  return { items, boards, total: items.length + boards.length };
}
