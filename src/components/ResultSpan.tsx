import React from 'react';

import type { DataPoint } from '../Types';

const HIGH_SCORE_THRESHHOLD = 1500;

interface Props {
  result: DataPoint;
}

export const ResultSpan = ({ result }: Props) => {
  const isHighScore = result.score > HIGH_SCORE_THRESHHOLD;

  return <span style={isHighScore ? { fontWeight: 'bold' } : {}}>{result.word}, </span>;
};
