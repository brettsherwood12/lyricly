import type { Dispatch } from 'react';

import { DataType } from './Constants';

export type DataPoint = {
  word: string;
  score: number;
  numSyllables?: number; // for rhymes
  tags?: string[]; // for related words
};

export type Response = {
  data: DataPoint[];
};

export type ContextValue = {
  selectedLyric: string;
  setSelectedLyric: Dispatch<string>;
  selectedDataType: DataType;
  setSelectedDataType: Dispatch<DataType>;
  rhymes: DataPoint[];
  setRhymes: Dispatch<DataPoint[]>;
  synonyms: DataPoint[];
  setSynonyms: Dispatch<DataPoint[]>;
  relatedWords: DataPoint[];
  setRelatedWords: Dispatch<DataPoint[]>;
};
