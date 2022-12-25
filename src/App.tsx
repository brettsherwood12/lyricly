import React, { useState, createContext } from 'react';
import { Box, Typography, Divider } from '@mui/material';

import { Lyrics } from './components/Lyrics';
import { Results } from './components/Results';

import { DataType } from './Constants';

import type { ContextValue, DataPoint } from './Types';

const initialContextValue: ContextValue = {
  selectedLyric: '',
  setSelectedLyric: () => {},
  selectedDataType: '' as DataType,
  setSelectedDataType: () => {},
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
  const [selectedDataType, setSelectedDataType] = useState<DataType>(DataType.RHYMES);
  const [rhymes, setRhymes] = useState<DataPoint[]>([]);
  const [synonyms, setSynonyms] = useState<DataPoint[]>([]);
  const [relatedWords, setRelatedWords] = useState<DataPoint[]>([]);

  const contextValue = {
    selectedLyric,
    setSelectedLyric,
    selectedDataType,
    setSelectedDataType,
    rhymes,
    setRhymes,
    synonyms,
    setSynonyms,
    relatedWords,
    setRelatedWords,
  };

  return (
    <Context.Provider value={contextValue}>
      <Box sx={{ height: '100vh', display: 'flex', gap: '16px', p: 2 }}>
        <Box sx={{ width: '50%', height: 'calc(100% - 128px)' }}>
          <Box sx={{ minHeight: '36px' }}>
            <Typography variant="h5">lyric.ly</Typography>
          </Box>
          <Lyrics />
        </Box>
        <Divider orientation="vertical" flexItem={true} />
        <Box sx={{ width: '50%', height: 'calc(100% - 128px)' }}>
          <Box sx={{ minHeight: '36px' }}>
            {selectedLyric && <Typography variant="h5">'{selectedLyric}'</Typography>}
          </Box>
          <Results />
        </Box>
      </Box>
    </Context.Provider>
  );
}

export default App;
