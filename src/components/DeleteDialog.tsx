import React from 'react';
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
  handleDelete: () => void;
}

export const DeleteDialog = ({ isOpen, setIsOpen, handleDelete }: Props) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Delete Saved Lyrics</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to permanently delete your saved lyrics? This action only deletes
          the record of your saved lyrics, it <strong>will not</strong> affect the text in the
          editor.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={() => handleDelete()} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
