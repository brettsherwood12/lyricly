import React from 'react';
import { Box, Divider, Hidden } from '@mui/material';

import { Results } from '../components/Results';
import { Lyrics } from '../components/Lyrics';

export const Home = () => {
  return (
    <Box
      sx={{
        height: { md: '100%' },
        display: { md: 'flex' },
        flexDirection: { xs: 'column', md: 'row' },
        gap: '24px',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          height: { xs: '32vh', md: '100%' },
          py: '16px',
        }}
      >
        <Lyrics />
      </Box>
      <Hidden mdUp>
        <Divider orientation="horizontal" flexItem />
      </Hidden>
      <Hidden smDown>
        <Divider orientation="vertical" flexItem />
      </Hidden>
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          height: { md: '100%' },
          py: '16px',
        }}
      >
        <Results />
      </Box>
    </Box>
  );
};
