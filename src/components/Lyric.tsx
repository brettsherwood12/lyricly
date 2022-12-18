import React, { useState, useEffect, useContext } from 'react';

import { Context } from '../App';
import { fetchData } from '../utils/fetchData';

import type { RenderElementProps } from 'slate-react';
import { DataType } from '../Constants';

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

  const { selectedLyric, setSelectedLyric, dataType, setRhymes, setSynonyms, setRelatedWords } =
    useContext(Context);

  const [isSelected, setIsSelected] = useState(false);

  const handleClick = async () => {
    setSelectedLyric(lyric);
    const data = await fetchData(lyric, dataType);
    const stringArray = data.map((datum: any) => datum.word);
    if (dataType === DataType.RHYMES) {
      setRhymes(stringArray);
    } else if (dataType === DataType.SYNONYMS) {
      setSynonyms(stringArray);
    } else if (dataType === DataType.RELATED) {
      setRelatedWords(stringArray);
    }
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
