import React, { useContext } from 'react';
import { Box, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
        <Box sx={{ minHeight: '36px', pb: 2 }}>
          <Typography variant="h5">about lyric.ly</Typography>
        </Box>
        <Box>
          <Typography gutterBottom>This is about lyric.ly</Typography>
          <Link
            href="#"
            onClick={(event) => handleClick(event, Screen.HOME)}
            sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <ArrowBackIcon fontSize="small" /> back to lyric.ly
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
