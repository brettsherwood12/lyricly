import React from 'react';
import { Box, Divider } from '@mui/material';

import { Lyrics } from '../components/Lyrics';
import { Results } from '../components/Results';

export const Home = () => {
  return (
    <Box sx={{ height: 'calc(100% - 32px)', display: 'flex', gap: '24px', py: '16px' }}>
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
