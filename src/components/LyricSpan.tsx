import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, createStyles } from '@mui/styles';

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
      cursor: 'auto',
    },
  }),
);

export const LyricSpan = ({ child }: any) => {
  const lyric = child.props.text.text.replace(/[^A-Za-z']/g, ''); // remove non-alphabetic chars

  const { selectedLyric, setSelectedLyric, setRhymes, setSynonyms, setRelatedWords } =
    useContext(Context);

  const classes = useStyles();

  const isSelected = selectedLyric === lyric; // is true for instances of word that were not clicked on

  const className = isSelected ? `${classes.span} ${classes.selected}` : classes.span;

  const handleClick = async () => {
    const { rhymes, synonyms, relatedWords } = await fetchResults(lyric);

    setSelectedLyric(lyric);
    setRhymes(rhymes);
    setSynonyms(synonyms);
    setRelatedWords(relatedWords);
  };

  return (
    <span data-custom-type="lyric" onClick={handleClick} className={className}>
      {child}
    </span>
  );
};
