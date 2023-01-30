import React, { useContext } from 'react';
import { Box, Link } from '@mui/material';

import { Context } from '../App';
import { Screen } from '../Constants';

import type { MouseEvent } from 'react';

const boxSx = {
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'lightgray',
  px: '24px',
};

export const Footer = () => {
  const { setScreen } = useContext(Context);

  const handleClick = (event: MouseEvent, screen: Screen) => {
    event.preventDefault();
    setScreen(screen);
  };

  return (
    <Box sx={boxSx}>
      <Box pr={3}>
        <Link href="#" underline="hover" onClick={(event) => handleClick(event, Screen.HOME)}>
          lyric.ly
        </Link>
      </Box>
      <Box pr={3}>
        <Link href="#" underline="hover" onClick={(event) => handleClick(event, Screen.ABOUT)}>
          About
        </Link>
      </Box>
    </Box>
  );
};
