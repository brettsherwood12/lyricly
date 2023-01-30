export enum Screen {
  HOME = 'home',
  ABOUT = 'about',
}

export enum Key {
  SPACE = ' ',
  ENTER = 'Enter',
  DELETE = 'Delete',
  BACKSPACE = 'Backspace',
}

export enum DataType {
  RHYMES = 'rhymes',
  SYNONYMS = 'synonyms',
  RELATED_WORDS = 'related',
}

export const dataTypes = [DataType.RHYMES, DataType.SYNONYMS, DataType.RELATED_WORDS];

export const dataTypeDefinitions = {
  [DataType.RHYMES]: {
    queryParamName: 'rel_rhy',
    highScoreThreshhold: 1500,
  },
  [DataType.SYNONYMS]: {
    queryParamName: 'rel_syn',
    highScoreThreshhold: 500,
  },
  [DataType.RELATED_WORDS]: {
    queryParamName: 'ml',
    highScoreThreshhold: 1000,
  },
};
