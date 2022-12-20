import React, { useState, useEffect, useContext } from 'react';

import { Context } from '../App';
import { fetchData } from '../utils/fetchData';

import { DataType, dataTypes } from '../Constants';

import type { RenderElementProps } from 'slate-react';

const spanStyle = {
  display: 'inline-block',
  // position: 'relative',
  textDecoration: 'underline',
  cursor: 'pointer',
};

const selectedSpanStyle = {
  display: 'inline-block',
  // position: 'relative',
  backgroundColor: '#FFFF00',
  cursor: 'auto',
};

export const Lyric = (props: RenderElementProps) => {
  const lyric = props.element.children[0].text;

  const { selectedLyric, setSelectedLyric, setRhymes, setSynonyms, setRelatedWords } =
    useContext(Context);

  const [isSelected, setIsSelected] = useState(false);

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
    <span
      {...props.attributes}
      onClick={handleClick}
      style={isSelected ? selectedSpanStyle : spanStyle}
    >
      {props.children}
    </span>
  );
};
