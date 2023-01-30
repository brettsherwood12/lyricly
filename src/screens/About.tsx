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
    <Box sx={{ height: '100%' }}>
      <Box sx={{ minHeight: '36px', pb: 2 }}>
        <Typography variant="h5">about lyric.ly</Typography>
      </Box>
      <Box
        sx={{
          height: 'calc(100% - 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Box pb={2}>
            <Typography gutterBottom>
              A simple yet elegant tool to help songwriters find the words they need for their
              working lyrics.
            </Typography>
            <Typography gutterBottom>
              Just click on a lyric in the text editor and lyric.ly will instantly fetch rhymes,
              synonyms and related words for it.
            </Typography>
            <Typography gutterBottom>
              Your lyrics are totally secure, as they never leave your web browser, only individual
              words are sent to 3rd party services to retrieve data.
            </Typography>
          </Box>
          <Box>
            <Link
              href="#"
              onClick={(event) => handleClick(event, Screen.HOME)}
              sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <ArrowBackIcon fontSize="small" /> back to lyric.ly
            </Link>
          </Box>
        </Box>
        <Box>
          <Typography>
            A special thanks to{' '}
            <Link href="https://www.datamuse.com/api/" target="blank">
              Datamuse
            </Link>
            , the API which is used for fetching word data, and to{' '}
            <Link href="https://docs.slatejs.org/" target="blank">
              Slate
            </Link>
            , the javascript library on which the text editor is built.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
