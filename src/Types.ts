import type { Dispatch } from 'react';

import { DataType } from './Constants';

export type ContextValue = {
  selectedLyric: string;
  setSelectedLyric: Dispatch<string>;
  dataType: DataType;
  setDataType: Dispatch<DataType>;
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
