import React from 'react';
import { Box } from '@mui/material';

const boxSx = {
  height: '100%',
  border: '1px solid darkgray',
  borderRadius: '8px',
  padding: '8px',
};

interface Props {
  words: string[];
}

export const Results = ({ words }: Props) => {
  return (
    <Box sx={boxSx}>
      {words.map((word) => (
        <span>{word}, </span>
      ))}
    </Box>
  );
};
