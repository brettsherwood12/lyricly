import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

import { TextEditor } from './components/TextEditor';
// import { Results } from './components/Results';

function App() {
  const [selectedWord, setSelectedWord] = useState('');

  return (
    <Box sx={{ height: '100vh', display: 'flex', gap: '16px', p: 2 }}>
      <Box sx={{ width: '75%', height: 'calc(100% - 128px)' }}>
        <Box sx={{ minHeight: '36px' }}>
          <Typography variant="h5">lyric.ly</Typography>
        </Box>
        <TextEditor setSelectedWord={setSelectedWord} />
      </Box>
      <Box sx={{ width: '25%', height: 'calc(100% - 128px)' }}>
        <Box sx={{ minHeight: '36px' }}>
          <Typography variant="h5">{selectedWord}</Typography>
        </Box>
        {/* <Results /> */}
      </Box>
    </Box>
  );
}

export default App;
