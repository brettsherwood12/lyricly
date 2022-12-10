import React, { useState } from 'react';
import { Box } from '@mui/material';

import { Tooltip } from './Tooltip';

import type { RenderElementProps } from 'slate-react';

const divSx = {
  display: 'inline-block',
  position: 'relative',
  textDecoration: 'underline',
};

export const Word = (props: RenderElementProps) => {
  const word = props.children[0].props.text.text;

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
    <span {...props.attributes}>
      <Box onMouseEnter={showTooltip} onMouseLeave={hideTooltip} sx={divSx}>
        {props.children}
        {isTooltipActive && <Tooltip word={word} />}
      </Box>
    </span>
  );
};
