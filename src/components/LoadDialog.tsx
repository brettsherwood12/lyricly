import React from 'react';
import { Box, Button, Dialog, Typography } from '@mui/material';

import type { Dispatch, SetStateAction } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleLoad: () => void;
}

export const LoadDialog = ({ isOpen, setIsOpen, handleLoad }: Props) => {
  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <Box sx={{ p: 3 }}>
        <Box pb={2}>
          <Typography gutterBottom>
            Are you sure you want to load your saved lyrics? This action is irreversible.
          </Typography>
          <Typography gutterBottom>
            This action loads your lyric's save record, and it will cause the text in the editor to
            be lost.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" size="small" color="warning" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" size="small" onClick={() => handleLoad()}>
            Load
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
