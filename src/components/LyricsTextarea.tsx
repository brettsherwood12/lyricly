import type { Lyric } from '../Types';

import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Textarea } from '@mui/joy';

import { LyricSpan } from './LyricSpan';

const placeholderText = 'Type or paste lyrics here...';

const divStyle = {
  display: 'inline-block',
  maxWidth: '740px',
  outline: 'none',
};

export const LyricsTextarea = () => {
  const [lyrics, setLyrics] = useState<Lyric[]>([]);
  const [textareaValue, setTextareaValue] = useState('');

  const hasLyrics = !isEmpty(lyrics);

  const handleTextareaChange = (event: any) => {
    setTextareaValue(event.target.value);
  };

  const handleTextareaKeyDown = (event: any) => {
    const isSpaceKey = event.key === ' ';
    const isEnterKey = event.key === 'Enter';

    if (isSpaceKey || isEnterKey) {
      const trimmedValue = event.target.value.trim();
      if (trimmedValue.length > 0) {
        const isNewLine = isEnterKey ? true : false;
        const newLyric = { word: trimmedValue, newLine: isNewLine };
        setLyrics([...lyrics, newLyric]);
        setTextareaValue('');
      }
    }
  };

  const handleTextareaPaste = (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    const clipBoardData = event.clipboardData;
    const text = clipBoardData.getData('text');
    const lines: string[] = text.split('\n');

    let newLyrics = [] as Lyric[];

    lines.forEach((line) => {
      const words = line.split(' ');
      words.forEach((word, index) => {
        const isLastWord = index < words.length - 1 ? false : true;
        newLyrics.push({ word, newLine: isLastWord ? true : false });
      });
    });

    setLyrics(newLyrics);
  };

  const handleDivInput = (event: any) => {
    // update lyrics array when user edits existing lyrics
    console.log(event);
  };

  return (
    <>
      <Textarea
        value={textareaValue}
        onChange={(event) => handleTextareaChange(event)}
        onKeyDown={(event) => handleTextareaKeyDown(event)}
        onPaste={(event) => handleTextareaPaste(event)}
        startDecorator={
          <div contentEditable="true" onInput={(event) => handleDivInput(event)} style={divStyle}>
            {lyrics.map((lyric, index) => (
              <LyricSpan key={`lyric-${index}`} lyric={lyric} />
            ))}
          </div>
        }
        placeholder={hasLyrics ? undefined : placeholderText}
        spellCheck="false"
        sx={{ height: '100%' }}
      />
    </>
  );
};
