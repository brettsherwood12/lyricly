import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

import { headerHeight } from '../Constants';

const boxSx = {
  height: `${headerHeight}px`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: '24px',
};

export const Header = () => {
  return (
    <Box>
      <Box sx={boxSx}>
        <Typography variant="h5">lyric.ly</Typography>
      </Box>
      <Divider />
    </Box>
  );
};
