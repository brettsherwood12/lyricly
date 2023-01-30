import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, createStyles } from '@mui/styles';

import { Context } from '../App';
import { fetchResults } from '../Utils';
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
      color: 'white',
      backgroundColor: '#3f51b5',
      cursor: 'auto',
    },
  }),
);

export const LyricSpan = (props: RenderElementProps) => {
  const lyric = props.element.children[0].text.replace(/[^A-Za-z']/g, ''); // remove non-alphabetic chars

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
    <span {...props.attributes} onClick={handleClick} className={className}>
      {props.children}
    </span>
  );
};
