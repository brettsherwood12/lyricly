import React, { useState, createContext } from 'react';
import { Box, ThemeProvider } from '@mui/material';

import { Home } from './screens/Home';
import { About } from './screens/About';
import { Footer } from './components/Footer';

import { theme } from './Theme';
import { DataType, Screen } from './Constants';
import type { ContextValue, DataPoint } from './Types';

const footerHeight = 36;
const paddingHeight = 48;

const boxSx = {
  height: `calc(100vh - ${footerHeight + paddingHeight}px)`,
  p: '24px',
};

const initialContextValue: ContextValue = {
  screen: '' as Screen,
  setScreen: () => {},
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
  const [screen, setScreen] = useState<Screen>(Screen.HOME);
  const [selectedLyric, setSelectedLyric] = useState<string>('');
  const [selectedDataType, setSelectedDataType] = useState<DataType>(DataType.RHYMES);
  const [rhymes, setRhymes] = useState<DataPoint[]>([]);
  const [synonyms, setSynonyms] = useState<DataPoint[]>([]);
  const [relatedWords, setRelatedWords] = useState<DataPoint[]>([]);

  const contextValue = {
    screen,
    setScreen,
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
    <ThemeProvider theme={theme}>
      <Context.Provider value={contextValue}>
        <Box sx={boxSx}>{(screen === Screen.ABOUT && <About />) || <Home />}</Box>
        <Footer />
      </Context.Provider>
    </ThemeProvider>
  );
}

export default App;
