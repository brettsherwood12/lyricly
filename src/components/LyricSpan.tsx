import type { Lyric } from '../Types';

import React from 'react';

import { TooltipWrapper } from './TooltipWrapper';

const spanStyle = {
  color: 'black',
  textDecoration: 'underline',
  fontWeight: 600,
  cursor: 'pointer',
};

export const LyricSpan = ({ lyric }: { lyric: Lyric }) => {
  return (
    <>
      <TooltipWrapper lyric={lyric}>
        <span style={spanStyle}>{lyric.word}</span>&nbsp;
      </TooltipWrapper>
      {lyric.newLine && <br />}
    </>
  );
};
