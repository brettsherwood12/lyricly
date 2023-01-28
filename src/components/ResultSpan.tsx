import React from 'react';

import { DataType, dataTypeDefinitions } from '../Constants';

import type { DataPoint } from '../Types';
interface Props {
  type: DataType;
  result: DataPoint;
  isLast: boolean;
}

export const ResultSpan = ({ type, result, isLast }: Props) => {
  // may use dataTypeDefinition to access metadata in future
  const dataType = dataTypeDefinitions[type];
  const punctuation = !isLast ? ', ' : '';

  return <span>{result.word + punctuation}</span>;
};
