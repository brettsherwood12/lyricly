import React, { useContext } from 'react';
import type { MouseEvent } from 'react';
import { Box, Link, Divider, Hidden, Typography } from '@mui/material';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

import { Context } from '../App';
import { headerHeight, Screen } from '../Constants';

const boxSx = {
  height: `${headerHeight}px`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: '24px',
};

export const Header = () => {
  const { screen, setScreen } = useContext(Context);

  const isHomeScreen = screen === Screen.HOME;
  const isAboutScreen = screen === Screen.ABOUT;

  const handleClick = (event: MouseEvent, screen: Screen) => {
    event.preventDefault();
    setScreen(screen);
  };

  return (
    <Box>
      <Box sx={boxSx}>
        <Box>
          <Link
            component="button"
            underline="none"
            onClick={(event) => handleClick(event, Screen.HOME)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <QueueMusicIcon fontSize="large" sx={{ mt: 0.5 }} />
              <Typography variant="h5">lyric.ly</Typography>
            </Box>
          </Link>
        </Box>
        <Hidden mdUp>
          <Box sx={{ display: 'flex' }}>
            <Box pr={3}>
              <Link
                component="button"
                underline="hover"
                onClick={(event) => handleClick(event, Screen.HOME)}
                disabled={isHomeScreen}
              >
                <Typography variant="body2">lyric.ly</Typography>
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
        </Hidden>
      </Box>
      <Divider />
    </Box>
  );
};
