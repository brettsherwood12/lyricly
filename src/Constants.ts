export const headerHeight = 64;
export const footerHeight = 48;

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
    noDataMessage: 'rhymes',
  },
  [DataType.SYNONYMS]: {
    queryParamName: 'rel_syn',
    noDataMessage: 'synonyms',
  },
  [DataType.RELATED_WORDS]: {
    queryParamName: 'ml',
    noDataMessage: 'related words',
  },
};
