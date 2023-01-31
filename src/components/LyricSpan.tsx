import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, createStyles } from '@mui/styles';

import { Context } from '../App';
import { fetchResults } from '../Utils';
import { colors } from '../Theme';

import type { RenderElementProps } from 'slate-react';

const useStyles = makeStyles(() =>
  createStyles({
    span: {
      display: 'inline-block',
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

  const [isSelected, setIsSelected] = useState(false);

  const className = isSelected ? `${classes.span} ${classes.selected}` : classes.span;

  const handleClick = async () => {
    setSelectedLyric(lyric);

    const { rhymes, synonyms, relatedWords } = await fetchResults(lyric);

    setRhymes(rhymes);
    setSynonyms(synonyms);
    setRelatedWords(relatedWords);
  };

  useEffect(() => {
    if (selectedLyric === lyric) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedLyric]);

  return (
    <span data-custom-type="lyric" onClick={handleClick} className={className}>
      {child}
    </span>
  );
};
