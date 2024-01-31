import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { usePress } from 'react-aria';

import { Context } from '../App';
import { fetchResults } from '../Utils';
import type { DataPoint } from '../Types';

interface Props {
  result: DataPoint;
  isLast: boolean;
}

export const ResultSpan = ({ result, isLast }: Props) => {
  const lyric = result.word;
  const punctuation = !isLast ? ', ' : '';

  const { setSelectedLyric, setRhymes, setSynonyms, setRelatedWords } = useContext(Context);

  const { pressProps } = usePress({
    onPressStart: async () => {
      const { rhymes, synonyms, relatedWords } = await fetchResults(lyric);

      setSelectedLyric(lyric);
      setRhymes(rhymes);
      setSynonyms(synonyms);
      setRelatedWords(relatedWords);
    },
  });

  return (
    <Typography
      color="primary"
      component="span"
      {...pressProps}
      sx={{ lineHeight: 1, cursor: 'pointer' }}
    >
      {lyric + punctuation}
    </Typography>
  );
};
