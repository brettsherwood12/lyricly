import React, { useContext } from 'react';
import type { MouseEvent } from 'react';
import { Box, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Context } from '../App';
import { Screen } from '../Constants';

const boxSx = {
  height: '100%',
  maxWidth: '1024px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const linkSx = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  width: 'max-content',
};

export const About = () => {
  const { setScreen } = useContext(Context);

  const handleClick = (event: MouseEvent, screen: Screen) => {
    event.preventDefault();
    setScreen(screen);
  };

  return (
    <Box sx={boxSx}>
      <Box pt={2}>
        <Box pb={2}>
          <Typography variant="h5">about</Typography>
        </Box>
        <Box pb={2}>
          <Typography gutterBottom>
            A simple yet elegant tool to help songwriters find the words they need for their working
            lyrics.
          </Typography>
          <Typography gutterBottom>
            No more fumbling around with word documents, endless Google searches, and multiple tabs.
            Get everything you need in one place so that you can better focus on the most important
            thing, writing your song.
          </Typography>
          <Typography gutterBottom>
            Just click on a lyric in the text editor and <strong>lyric.ly</strong> will instantly
            find rhymes, synonyms and related words for it.
          </Typography>
          <Typography gutterBottom>
            Your lyrics are totally secure, as they never leave your web browser. Only individual
            words are sent across the internet.
          </Typography>
        </Box>
        <Box>
          <Link
            href="#"
            underline="hover"
            onClick={(event) => handleClick(event, Screen.HOME)}
            sx={linkSx}
          >
            <ArrowBackIcon fontSize="small" sx={{ mt: 0.25 }} />
            <Typography>back to lyric.ly</Typography>
          </Link>
        </Box>
      </Box>
      <Box pb={4}>
        <Typography>
          A special thanks to{' '}
          <Link href="https://www.datamuse.com/api/" underline="hover" target="blank">
            Datamuse
          </Link>
          , the API which is used for fetching word data, and to{' '}
          <Link href="https://docs.slatejs.org/" underline="hover" target="blank">
            Slate
          </Link>
          , the javascript library on which the text editor is built.
        </Typography>
      </Box>
    </Box>
  );
};
