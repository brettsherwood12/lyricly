import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const boxSx = {
  height: '100%',
  maxWidth: '1024px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export const NotFound = () => {
  return (
    <Box sx={boxSx}>
      <Box pt={2}>
        <Box pb={2}>
          <Typography variant="h5">not found</Typography>
        </Box>
        <Box pb={2}>
          <Typography>Unable to find page</Typography>
        </Box>
        <Box>
          <Box>
            <Link to="/">
              <ArrowBackIcon fontSize="small" sx={{ mt: 0.25 }} />
              <Typography>back to lyricly</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
