import axios from 'axios';

import { DataType } from '../Constants';

const baseUrl = 'https://api.datamuse.com';

const typeToQueryMap = {
  [DataType.RHYMES]: 'rel_rhy',
  [DataType.SYNONYMS]: 'rel_syn',
  [DataType.RELATED]: 'ml',
};

export const fetchData = async (word: string, type: DataType) => {
  const queryParam = typeToQueryMap[type];
  const requestUrl = `${baseUrl}/words?${queryParam}=${word}`;
  const response = await axios.get(requestUrl);
  return response.data;
};
