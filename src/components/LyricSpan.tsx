import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { usePress } from 'react-aria';

import { Context } from '../App';
import { fetchResults } from '../Utils';
import { colors } from '../Theme';

export const LyricSpan = ({ child }: any) => {
  const { text }: { text: string } = child.props.text;
  const lyric = text.toLowerCase().replace(/[^A-Za-z']/g, ''); // remove non-alphabetic chars

  const { selectedLyric, setSelectedLyric, setRhymes, setSynonyms, setRelatedWords } =
    useContext(Context);
  const isSelected = selectedLyric === lyric; // is true for instances of word that were not clicked on

  const { pressProps } = usePress({
    onPressStart: async () => {
      if (lyric.length <= 45) {
        const { rhymes, synonyms, relatedWords } = await fetchResults(lyric);

        setSelectedLyric(lyric);
        setRhymes(rhymes);
        setSynonyms(synonyms);
        setRelatedWords(relatedWords);
      }
    },
  });

  return (
    <Typography
      component="span"
      {...pressProps}
      data-custom-type="lyric"
      sx={{
        lineHeight: 1,
        cursor: 'pointer',
        ...(isSelected
          ? {
              textDecoration: 'none',
              color: colors.white,
              backgroundColor: colors.highlight,
            }
          : {
              textDecoration: 'underline',
            }),
      }}
    >
      {child}
    </Typography>
  );
};
