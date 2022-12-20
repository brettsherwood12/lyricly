import React, { useContext, useState } from 'react';
import { Typography, Tabs, Tab } from '@mui/material';
import { Box } from '@mui/material';

import { Context } from '../App';
import { TabPanel } from './TabPanel';

import type { SyntheticEvent } from 'react';
import { DataType } from '../Constants';

const boxSx = {
  // height: '100%',
};

const tabsSx = {
  display: 'flex',
  justifyContent: 'space-between',
  px: 4,
};

export const Results = () => {
  const { setSelectedDataType, rhymes, synonyms, relatedWords } = useContext(Context);

  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      setSelectedDataType(DataType.RHYMES);
    } else if (newValue === 1) {
      setSelectedDataType(DataType.SYNONYMS);
    } else if (newValue === 2) {
      setSelectedDataType(DataType.RELATED_WORDS);
    }
  };

  return (
    <Box sx={boxSx}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Rhymes" />
        <Tab label="Synonyms" />
        <Tab label="Related Words" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {rhymes.map((rhyme) => (
          <span>{rhyme} </span>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {synonyms.map((synonym) => (
          <span>{synonym} </span>
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {relatedWords.map((relatedWord) => (
          <span>{relatedWord} </span>
        ))}
      </TabPanel>
    </Box>
  );
};
