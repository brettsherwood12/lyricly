import React from 'react';
import { Box, Typography } from '@mui/material';

import type { ReactNode } from 'react';

const boxSx = {
  pt: 1,
};

interface Props {
  index: number;
  value: number;
  children?: ReactNode;
}

export const TabPanel = (props: Props) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={boxSx}>{children}</Box>}
    </div>
  );
};
