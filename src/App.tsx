import React from 'react';
import { Box, Typography } from '@mui/material';

import { TextEditor } from './components/TextEditor';

function App() {
  return (
    <Box sx={{ height: '100vh', p: 2 }}>
      <Box sx={{ pl: 2, mb: 2 }}>
        <Typography variant="h5">
          <span style={{ fontSize: '32px', marginRight: '8px' }}>&#9997;&#65039;</span>
          lyric.ly
        </Typography>
      </Box>
      <Box sx={{ width: '768px', height: 'calc(100% - 128px)' }}>
        <TextEditor />
      </Box>
    </Box>
  );
}

export default App;
