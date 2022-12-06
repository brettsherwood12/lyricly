export interface Lyric {
  word: string;
  newLine: boolean;
}

export enum DataType {
  RHYMES = 'rhymes',
  SYNONYMS = 'synonyms',
  RELATED = 'related',
}
