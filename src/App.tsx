import React, { useContext, useState, createContext } from 'react';
import { Box, Typography } from '@mui/material';

import { TextEditor } from './components/TextEditor';
// import { Results } from './components/Results';

import type { ContextValue } from './Types';

const initialContextValue: ContextValue = {
  selectedLyric: '',
  setSelectedLyric: () => {},
  rhymes: [],
  setRhymes: () => {},
  synonyms: [],
  setSynonyms: () => {},
  relatedWords: [],
  setRelatedWords: () => {},
};

export const Context = createContext<ContextValue>(initialContextValue);

function App() {
  const [selectedLyric, setSelectedLyric] = useState<string>('');
  const [rhymes, setRhymes] = useState<string[]>([]);
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [relatedWords, setRelatedWords] = useState<string[]>([]);

  const contextValue = {
    selectedLyric,
    setSelectedLyric,
    rhymes,
    setRhymes,
    synonyms,
    setSynonyms,
    relatedWords,
    setRelatedWords,
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', gap: '16px', p: 2 }}>
      <Context.Provider value={contextValue}>
        <Box sx={{ width: '75%', height: 'calc(100% - 128px)' }}>
          <Box sx={{ minHeight: '36px' }}>
            <Typography variant="h5">lyric.ly</Typography>
          </Box>
          <TextEditor />
        </Box>
        <Box sx={{ width: '25%', height: 'calc(100% - 128px)' }}>
          <Box sx={{ minHeight: '36px' }}>
            <Typography variant="h5">{selectedLyric}</Typography>
          </Box>
          {/* <Results /> */}
        </Box>
      </Context.Provider>
    </Box>
  );
}

export default App;
