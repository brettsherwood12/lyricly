import React, { useContext } from 'react';
import { Box, Link, Typography } from '@mui/material';

import { Context } from '../App';

import { Screen } from '../Constants';

import type { MouseEvent } from 'react';

export const About = () => {
  const { setScreen } = useContext(Context);

  const handleClick = (event: MouseEvent, screen: Screen) => {
    event.preventDefault();
    setScreen(screen);
  };
  return (
    <Box>
      <Box sx={{ height: 'calc(100% - 128px)' }}>
        <Box sx={{ minHeight: '36px' }}>
          <Typography variant="h5">About</Typography>
        </Box>
        <Link href="#" onClick={(event) => handleClick(event, Screen.HOME)}>
          Back to App
        </Link>
      </Box>
    </Box>
  );
};
