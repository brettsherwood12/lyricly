import React from 'react';
import { Typography } from '@mui/material';

import type { DataPoint } from '../Types';
interface Props {
  result: DataPoint;
  isLast: boolean;
}

export const ResultSpan = ({ result, isLast }: Props) => {
  const punctuation = !isLast ? ', ' : '';

  return <span>{result.word + punctuation}</span>;
};
