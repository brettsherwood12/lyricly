import React, { useContext } from 'react';
import { Box, Divider, Link, Typography } from '@mui/material';

import { Context } from '../App';
import { Screen } from '../Constants';

import type { MouseEvent } from 'react';

const year = new Date().getFullYear();

const boxSx = {
  height: '36px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const Footer = () => {
  const { setScreen } = useContext(Context);

  const handleClick = (event: MouseEvent, screen: Screen) => {
    event.preventDefault();
    setScreen(screen);
  };

  return (
    <Box px="24px">
      <Divider />
      <Box sx={boxSx}>
        <Box sx={{ display: 'flex' }}>
          <Box pr={3}>
            <Link href="#" underline="hover" onClick={(event) => handleClick(event, Screen.HOME)}>
              lyric.ly
            </Link>
          </Box>
          <Box pr={3}>
            <Link href="#" underline="hover" onClick={(event) => handleClick(event, Screen.ABOUT)}>
              about
            </Link>
          </Box>
        </Box>
        <Box>
          <Typography>
            &copy; {year}{' '}
            <Link href="https://github.com/clockmakerbrett" target="blank">
              Brett Sherwood
            </Link>{' '}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
