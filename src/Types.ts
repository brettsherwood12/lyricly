import type { Dispatch } from 'react';

export type ContextValue = {
  selectedLyric: string;
  setSelectedLyric: Dispatch<string>;
  rhymes: string[];
  setRhymes: Dispatch<string[]>;
  synonyms: string[];
  setSynonyms: Dispatch<string[]>;
  relatedWords: string[];
  setRelatedWords: Dispatch<string[]>;
};

export interface Lyric {
  word: string;
  newLine: boolean;
}
