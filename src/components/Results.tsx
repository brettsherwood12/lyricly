import React, { useContext, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Box } from '@mui/material';

import { Context } from '../App';
import { TabPanel } from './TabPanel';
import { ResultSpan } from './ResultSpan';

import type { SyntheticEvent } from 'react';
import { DataType } from '../Constants';

const boxSx = {
  height: '100%',
  // backgroundColor: 'lightgray',
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
        {rhymes.map((rhyme, index) => {
          const isLast = index === rhymes.length - 1 ? true : false;
          return <ResultSpan type={DataType.RHYMES} result={rhyme} isLast={isLast} />;
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {synonyms.map((synonym, index) => {
          const isLast = index === rhymes.length - 1 ? true : false;
          return <ResultSpan type={DataType.SYNONYMS} result={synonym} isLast={isLast} />;
        })}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {relatedWords.map((relatedWord, index) => {
          const isLast = index === rhymes.length - 1 ? true : false;
          return <ResultSpan type={DataType.RELATED_WORDS} result={relatedWord} isLast={isLast} />;
        })}
      </TabPanel>
    </Box>
  );
};
