import type { Lyric } from '../Types';

import React from 'react';

import { TooltipWrapper } from './TooltipWrapper';

const spanStyle = {
  color: 'white',
  backgroundColor: 'gray',
  borderRadius: '4px',
  padding: '0 4px',
  marginRight: '4px',
};

export const LyricSpan = ({ lyric }: { lyric: Lyric }) => {
  return (
    <>
      <TooltipWrapper lyric={lyric}>
        <span style={spanStyle}>{lyric.word}</span>
      </TooltipWrapper>
      {lyric.newLine && <br />}
    </>
  );
};
