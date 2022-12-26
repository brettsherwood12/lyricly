import React from 'react';

import { DataType, dataTypeDefinitions } from '../Constants';

import type { DataPoint } from '../Types';
interface Props {
  type: DataType;
  result: DataPoint;
}

export const ResultSpan = ({ type, result }: Props) => {
  const dataType = dataTypeDefinitions[type];
  const isHighScore = result.score > dataType.highScoreThreshhold;

  return <span style={isHighScore ? { fontWeight: 'bold' } : {}}>{result.word}, </span>;
};
