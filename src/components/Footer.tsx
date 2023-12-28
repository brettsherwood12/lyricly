import React, { useContext } from 'react';
import { Box, Divider, Link, Typography } from '@mui/material';

import { Context } from '../App';
import { footerHeight, Screen } from '../Constants';

import type { MouseEvent } from 'react';

const year = new Date().getFullYear();

const boxSx = {
  height: `${footerHeight}px`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: '24px',
};

export const Footer = () => {
  const { screen, setScreen } = useContext(Context);

  const isHomeScreen = screen === Screen.HOME;
  const isAboutScreen = screen === Screen.ABOUT;

  const handleClick = (event: MouseEvent, screen: Screen) => {
    event.preventDefault();
    setScreen(screen);
  };

  return (
    <Box>
      <Divider />
      <Box sx={boxSx}>
        <Box sx={{ display: 'flex' }}>
          <Box pr={3}>
            <Link
              component="button"
              underline="hover"
              onClick={(event) => handleClick(event, Screen.HOME)}
              disabled={isHomeScreen}
            >
              <Typography variant="body2">lyricly</Typography>
            </Link>
          </Box>
          <Box pr={3}>
            <Link
              component="button"
              underline="hover"
              onClick={(event) => handleClick(event, Screen.ABOUT)}
              disabled={isAboutScreen}
            >
              <Typography variant="body2">about</Typography>
            </Link>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2">
            &copy; {year}{' '}
            <Link href="https://github.com/brett-generac" target="blank" underline="hover">
              Brett Sherwood
            </Link>{' '}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
