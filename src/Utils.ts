import axios from 'axios';

import { DataType, dataTypeDefinitions } from './Constants';

import type { Data } from './Types';

const baseUrl = 'https://api.datamuse.com';

const rhymeQuery = dataTypeDefinitions[DataType.RHYMES].queryParamName;
const synonymQuery = dataTypeDefinitions[DataType.SYNONYMS].queryParamName;
const relatedWordsQuery = dataTypeDefinitions[DataType.RELATED_WORDS].queryParamName;

export const fetchResults = async (lyric: string): Promise<Data> => {
  const rhymeUrl = `${baseUrl}/words?${rhymeQuery}=${lyric}`;
  const synonymUrl = `${baseUrl}/words?${synonymQuery}=${lyric}`;
  const relatedWordsUrl = `${baseUrl}/words?${relatedWordsQuery}=${lyric}`;

  const rhymeRequest = axios.get(rhymeUrl);
  const synonymRequest = axios.get(synonymUrl);
  const relatedWordsRequest = axios.get(relatedWordsUrl);

  const data = {} as Data;

  axios.all([rhymeRequest, synonymRequest, relatedWordsRequest]).then((responses) => {
    const [rhymeReponse, synonymResponse, relatedWordResponse] = responses;

    data.rhymes = rhymeReponse.data;
    data.synonyms = synonymResponse.data;
    data.relatedWords = relatedWordResponse.data;
  });

  return data;
};
