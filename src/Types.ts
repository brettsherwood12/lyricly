import type { Dispatch } from 'react';

import { DataType, Screen } from './Constants';

export type DataPoint = {
  word: string;
  score: number;
  numSyllables?: number; // for rhymes
  tags?: string[]; // for related words
};

export type Data = {
  rhymes: DataPoint[];
  synonyms: DataPoint[];
  relatedWords: DataPoint[];
};

export type ContextValue = {
  screen: Screen;
  setScreen: Dispatch<Screen>;
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
