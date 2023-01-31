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
    name: 'rhymes',
    query: 'rel_rhy',
  },
  [DataType.SYNONYMS]: {
    name: 'synonyms',
    query: 'rel_syn',
  },
  [DataType.RELATED_WORDS]: {
    name: 'related words',
    query: 'ml',
  },
};
