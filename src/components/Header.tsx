import React, { useContext } from 'react';
import type { MouseEvent } from 'react';
import { Box, Link, Divider, Typography } from '@mui/material';
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
  const { setScreen } = useContext(Context);

  const handleClick = (event: MouseEvent, screen: Screen) => {
    event.preventDefault();
    setScreen(screen);
  };

  return (
    <Box>
      <Box sx={boxSx}>
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
      <Divider />
    </Box>
  );
};
