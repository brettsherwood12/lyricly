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
      <Box sx={{ width: '50%', height: 'calc(100% - 128px)' }}>
        <Box sx={{ minHeight: '36px' }}>
          <Typography variant="h5">lyric.ly</Typography>
        </Box>
        <Lyrics />
      </Box>
      <Divider orientation="vertical" flexItem={true} />
      <Box sx={{ width: '50%', height: 'calc(100% - 128px)' }}>
        <Box sx={{ minHeight: '36px' }}>
          {selectedLyric && <Typography variant="h5">'{selectedLyric}'</Typography>}
        </Box>
        <Results />
      </Box>
    </Box>
  );
};
