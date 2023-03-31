import React from 'react';
import { Box, Divider, Hidden } from '@mui/material';

import { Lyrics } from '../components/Lyrics';
import { Results } from '../components/Results';

export const Home = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: { xs: 'column', md: 'flex' },
        flexDirection: { xs: 'column', md: 'row' },
        gap: '24px',
      }}
    >
      <Box sx={{ width: { xs: '100%', md: '50%' }, height: { xs: '50%', md: '100%' }, py: '16px' }}>
        <Lyrics />
      </Box>
      <Hidden smDown>
        <Divider orientation="vertical" flexItem={true} />
      </Hidden>
      <Hidden mdUp>
        <Divider orientation="horizontal" flexItem={true} />
      </Hidden>
      <Box sx={{ width: { xs: '100%', md: '50%' }, height: { xs: '50%', md: '100%' }, py: '16px' }}>
        <Results />
      </Box>
    </Box>
  );
};
