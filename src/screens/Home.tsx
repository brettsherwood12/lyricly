import React, { useContext } from 'react';
import { Box, Divider, Typography } from '@mui/material';

import { Context } from '../App';
import { Lyrics } from '../components/Lyrics';
import { Results } from '../components/Results';

const boxSx = {
  height: '100%',
  display: 'flex',
  gap: '24px',
};

export const Home = () => {
  const { selectedLyric } = useContext(Context);

  return (
    <Box sx={boxSx}>
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
