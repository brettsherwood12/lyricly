import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { usePress } from 'react-aria';

import { Context } from '../App';
import { fetchResults } from '../Utils';
import { colors } from '../Theme';

const useStyles = makeStyles(() =>
  createStyles({
    span: {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    selected: {
      textDecoration: 'none',
      color: colors.white,
      backgroundColor: colors.highlight,
    },
  }),
);

export const LyricSpan = ({ child }: any) => {
  const { text }: { text: string } = child.props.text;
  const lyric = text.toLowerCase().replace(/[^A-Za-z']/g, ''); // remove non-alphabetic chars

  const { selectedLyric, setSelectedLyric, setRhymes, setSynonyms, setRelatedWords } =
    useContext(Context);
  const isSelected = selectedLyric === lyric; // is true for instances of word that were not clicked on

  const classes = useStyles();
  const className = isSelected ? `${classes.span} ${classes.selected}` : classes.span;

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
    <span {...pressProps} data-custom-type="lyric" className={className}>
      {child}
    </span>
  );
};
