import React from 'react';
import { Box, Button, Dialog, Typography } from '@mui/material';

import type { Dispatch, SetStateAction } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
}

export const DeleteDialog = ({ isOpen, setIsOpen, handleDelete }: Props) => {
  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <Box sx={{ p: 3 }}>
        <Box pb={2}>
          <Typography gutterBottom>
            Are you sure you want to delete your saved lyrics? This action is irreversible.
          </Typography>
          <Typography gutterBottom>
            This action deletes your lyric's save record only, it will <strong>not</strong> affect
            the text in the editor.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" size="small" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" size="small" color="error" onClick={() => handleDelete()}>
            Delete
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
