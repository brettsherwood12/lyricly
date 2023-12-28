import React, { useState } from 'react';
import { Box, Link, List, ListItemButton, ListItemIcon, Popover, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import type { Dispatch, PointerEvent, SetStateAction } from 'react';
import type { Action } from './ActionDialog';

const localeStringOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

interface Props {
  savedDateTime: number;
  setDialogAction: Dispatch<SetStateAction<Action>>;
}

export const SavePopover = (props: Props) => {
  const { savedDateTime, setDialogAction } = props;
  const savedDateTimeString = new Date(savedDateTime).toLocaleString([], localeStringOptions);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenClick = (event: PointerEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoadClick = () => {
    setDialogAction('load');
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setDialogAction('delete');
    setAnchorEl(null);
  };

  return (
    <Box>
      <Link component="button" underline="always" onClick={handleOpenClick}>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          Saved {savedDateTimeString}
        </Typography>
      </Link>
      <Popover
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box>
          <List sx={{ width: '164px' }}>
            <ListItemButton onClick={handleLoadClick} sx={{ fontSize: '10px' }}>
              <ListItemIcon>
                <FolderOpenIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <Typography variant="body2">Load</Typography>
            </ListItemButton>
            <ListItemButton onClick={handleDeleteClick}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" color="error" />
              </ListItemIcon>
              <Typography variant="body2">Delete</Typography>
            </ListItemButton>
          </List>
        </Box>
      </Popover>
    </Box>
  );
};
