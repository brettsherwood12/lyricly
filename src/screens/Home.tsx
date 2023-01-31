import React from 'react';
import { Box, Divider } from '@mui/material';

import { Lyrics } from '../components/Lyrics';
import { Results } from '../components/Results';

export const Home = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', gap: '24px' }}>
      <Box sx={{ width: '50%' }}>
        <Lyrics />
      </Box>
      <Divider orientation="vertical" flexItem={true} />
      <Box sx={{ width: '50%' }}>
        <Results />
      </Box>
    </Box>
  );
};
