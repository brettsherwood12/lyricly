import React from 'react';
import { Box, Dialog, DialogContent, Hidden, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import type { Dispatch, SetStateAction } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const HelpDialog = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
          <Typography variant="h5" sx={{ pl: 6 }}>
            Help
          </Typography>
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <Hidden mdDown>
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
              <span id="left" style={{ fontSize: '32px' }}>
                &#128072;
              </span>
              <Typography ml={2}>
                Begin by typing or pasting lyrics in the box on the left
              </Typography>
            </Box>
            <Box sx={{ pb: 1 }}>
              <Typography ml={6}>
                Words, separated by a space, will become interactive, and are indicated as such with
                an <span style={{ textDecoration: 'underline' }}>underline</span>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
              <Typography ml={6} mr={2}>
                Clicking a <span style={{ textDecoration: 'underline' }}>word</span> will gather
                data for it in the box on the right
              </Typography>
              <span id="right" style={{ fontSize: '32px' }}>
                &#128073;
              </span>
            </Box>
          </Hidden>
          {/* mobile version */}
          <Hidden mdUp>
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
              <span id="top" style={{ fontSize: '32px' }}>
                &#9757;
              </span>
              <Typography ml={2}>
                Begin by typing or pasting lyrics in the box on the top
              </Typography>
            </Box>
            <Box sx={{ pb: 1 }}>
              <Typography ml={6}>
                Words, separated by a spaces, will become interactive, and are indicated as such
                with an <span style={{ textDecoration: 'underline' }}>underline</span>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
              <Typography ml={6} mr={2}>
                Clicking a <span style={{ textDecoration: 'underline' }}>word</span> will gather
                data for it in the box on the bottom
              </Typography>
              <span id="bottom" style={{ fontSize: '32px' }}>
                &#128071;
              </span>
            </Box>
          </Hidden>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
