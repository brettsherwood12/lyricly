import React, { useContext, useState } from 'react';
import type { MouseEvent } from 'react';
import { Box, Button, Link, Divider, Hidden, Typography } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

import { Context } from '../App';
import { headerHeight, Screen } from '../Constants';
import { HelpDialog } from './HelpDialog';

const boxSx = {
  height: `${headerHeight}px`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: '24px',
};

export const Header = () => {
  const { screen, setScreen } = useContext(Context);

  const isHomeScreen = screen === Screen.HOME;
  const isAboutScreen = screen === Screen.ABOUT;

  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState<boolean>(false);

  const handleClick = (event: MouseEvent, screen: Screen) => {
    event.preventDefault();
    setScreen(screen);
  };

  return (
    <>
      <Box>
        <Box sx={boxSx}>
          <Box>
            <Link
              component="button"
              underline="none"
              onClick={(event) => handleClick(event, Screen.HOME)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <QueueMusicIcon fontSize="large" sx={{ mt: 0.5 }} />
                <Typography variant="h5">lyricly</Typography>
              </Box>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Hidden mdUp>
              <Box pr={3}>
                <Link
                  component="button"
                  underline="hover"
                  onClick={(event) => handleClick(event, Screen.HOME)}
                  disabled={isHomeScreen}
                >
                  <Typography variant="body2">lyricly</Typography>
                </Link>
              </Box>
              <Box pr={1}>
                <Link
                  component="button"
                  underline="hover"
                  onClick={(event) => handleClick(event, Screen.ABOUT)}
                  disabled={isAboutScreen}
                >
                  <Typography variant="body2">about</Typography>
                </Link>
              </Box>
            </Hidden>
            <Box minWidth="64px">
              {isHomeScreen && (
                <Button
                  variant="contained"
                  onClick={() => setIsHelpDialogOpen(true)}
                  sx={{ borderRadius: '50%', p: 1.5, transform: 'scale(0.5)' }}
                >
                  <QuestionMarkIcon fontSize="large" sx={{ mt: 0.5 }} />
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Divider />
      </Box>
      <HelpDialog isOpen={isHelpDialogOpen} setIsOpen={setIsHelpDialogOpen} />
    </>
  );
};
