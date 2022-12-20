import axios from 'axios';

import { DataType, dataTypeDefinitions } from '../Constants';

import type { Response } from '../Types';

const baseUrl = 'https://api.datamuse.com';

export const fetchData = async (word: string, type: DataType): Promise<Response> => {
  const { queryParamName } = dataTypeDefinitions[type];
  const requestUrl = `${baseUrl}/words?${queryParamName}=${word}`;
  const response = await axios.get(requestUrl);
  return response;
};
