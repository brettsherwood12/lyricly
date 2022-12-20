import type { Dispatch } from 'react';

import { DataType } from './Constants';

export type ContextValue = {
  selectedLyric: string;
  setSelectedLyric: Dispatch<string>;
  selectedDataType: DataType;
  setSelectedDataType: Dispatch<DataType>;
  rhymes: string[];
  setRhymes: Dispatch<string[]>;
  synonyms: string[];
  setSynonyms: Dispatch<string[]>;
  relatedWords: string[];
  setRelatedWords: Dispatch<string[]>;
};

type DataPoint = {
  word: string;
  score: number;
  numSyllables?: number; // for rhymes
  tags?: string[]; // for related words
};

export type Response = {
  data: DataPoint[];
};
