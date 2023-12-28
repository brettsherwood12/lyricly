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

export type Action = 'save' | 'load' | 'delete' | null;

interface Props {
  action: Action;
  setAction: Dispatch<SetStateAction<Action>>;
  handleAction: () => void;
}

export const ActionDialog = ({ action, setAction, handleAction }: Props) => {
  const titlePrefix = !!action ? action?.charAt(0).toUpperCase() + action?.slice(1) : '';
  const title = action !== 'save' ? `${titlePrefix} Saved Lyrics` : `${titlePrefix} Lyrics`;

  return (
    <Dialog open={!!action}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {action === 'save' ? (
          <DialogContentText>
            Are you sure you want to save the lyrics in the text editor? This action will{' '}
            <strong>permanently</strong> discard any previously saved lyrics.
          </DialogContentText>
        ) : action === 'load' ? (
          <DialogContentText>
            Are you sure you want to load your saved lyrics? This action will{' '}
            <strong>permanently</strong> discard any changes you have made in the text editor.
          </DialogContentText>
        ) : (
          <DialogContentText>
            Are you sure you want to permanently delete your saved lyrics? This action only deletes
            your saved lyrics, it <strong>will not</strong> affect the text in the editor.
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions sx={{ m: '0 auto 16px 16px' }}>
        <Button variant="contained" onClick={() => handleAction()} autoFocus>
          {action}
        </Button>
        <Button variant="contained" color="warning" onClick={() => setAction(null)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
