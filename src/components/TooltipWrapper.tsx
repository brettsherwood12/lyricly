import type { Lyric } from '../Types';

import React, { useState } from 'react';
import { Box } from '@mui/material';

import { Tooltip } from './Tooltip';

interface Props {
  lyric: Lyric;
  children: React.ReactNode;
}

export const TooltipWrapper = ({ lyric, children }: Props) => {
  const [isTooltipActive, setIsTooltipActive] = useState(false);

  let timeout: any;

  const showTooltip = () => {
    timeout = setTimeout(() => {
      setIsTooltipActive(true);
    }, 200);
  };

  const hideTooltip = () => {
    clearInterval(timeout);
    setIsTooltipActive(false);
  };

  return (
    <Box
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      sx={{ display: 'inline-block', position: 'relative' }}
    >
      {children}
      {isTooltipActive && <Tooltip lyric={lyric} />}
    </Box>
  );
};
