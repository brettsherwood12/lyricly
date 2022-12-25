import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, createStyles } from '@mui/styles';

import { Context } from '../App';
import { fetchData } from '../utils/fetchData';

import { DataType, dataTypes } from '../Constants';

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
      backgroundColor: '#FFFF00',
      cursor: 'auto',
    },
  }),
);

export const Lyric = (props: RenderElementProps) => {
  const lyric = props.element.children[0].text.replace(/\W/g, ''); // remove non-alphabetic chars

  const { selectedLyric, setSelectedLyric, setRhymes, setSynonyms, setRelatedWords } =
    useContext(Context);

  const classes = useStyles();

  const [isSelected, setIsSelected] = useState(false);

  const className = isSelected ? `${classes.span} ${classes.selected}` : classes.span;

  const handleClick = () => {
    setSelectedLyric(lyric);

    dataTypes.forEach(async (dataType) => {
      const { data } = await fetchData(lyric, dataType);

      if (dataType === DataType.RHYMES) {
        setRhymes(data);
      } else if (dataType === DataType.SYNONYMS) {
        setSynonyms(data);
      } else if (dataType === DataType.RELATED_WORDS) {
        setRelatedWords(data);
      }
    });
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
