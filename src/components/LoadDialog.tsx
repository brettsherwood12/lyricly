import React from 'react';
// import { Box, Button, Dialog, Typography } from '@mui/material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import type { Dispatch, SetStateAction } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleLoad: () => void;
}

export const LoadDialog = ({ isOpen, setIsOpen, handleLoad }: Props) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Load Saved Lyrics</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to load your saved lyrics? This action will{' '}
          <strong>permanently</strong> discard any changes you have made in the text editor.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ m: '0 auto 16px 16px' }}>
        <Button variant="contained" color="warning" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => handleLoad()} autoFocus>
          Load
        </Button>
      </DialogActions>
    </Dialog>
  );
};
