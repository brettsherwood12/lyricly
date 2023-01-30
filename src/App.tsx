import React, { useState, createContext } from 'react';
import { Box } from '@mui/material';

import { Home } from './screens/Home';

import { DataType } from './Constants';

import type { ContextValue, DataPoint } from './Types';

const boxSx = {
  height: 'calc(100vh - 48px)',
  p: '24px',
};

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
      <Box sx={boxSx}>
        <Home />
      </Box>
    </Context.Provider>
  );
}

export default App;
