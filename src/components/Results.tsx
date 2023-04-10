import React, { useContext, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import type { SyntheticEvent } from 'react';

import { Context } from '../App';
import { TabPanel } from './TabPanel';
import { ResultSpan } from './ResultSpan';

import { DataType, dataTypeDefinitions } from '../Constants';

interface Props {
  type: DataType;
  lyric: string;
}

const NoDataMessage = ({ type, lyric }: Props) => {
  const dataTypeName = dataTypeDefinitions[type].name;

  return (
    <Typography sx={{ fontStyle: 'italic' }}>
      No {dataTypeName} found for '{lyric}'
    </Typography>
  );
};

export const Results = () => {
  const { selectedLyric, selectedDataType, setSelectedDataType, rhymes, synonyms, relatedWords } =
    useContext(Context);

  const hasSelectedLyric = !isEmpty(selectedLyric);

  const hasNoRhymes = hasSelectedLyric && isEmpty(rhymes);
  const hasNoSynonyms = hasSelectedLyric && isEmpty(synonyms);
  const hasNoRelatedWords = hasSelectedLyric && isEmpty(relatedWords);

  const dataTypeName = dataTypeDefinitions[selectedDataType].name;

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
    <Box>
      <Box>
        {hasSelectedLyric ? (
          <Typography variant="h6">'{selectedLyric}'</Typography>
        ) : (
          <Typography variant="h6" sx={{ fontStyle: 'italic' }}>
            Select a lyric to find {dataTypeName}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Rhymes" />
          <Tab label="Synonyms" />
          <Tab label="Related Words" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Box sx={{ fontSize: { xs: '12px', sm: '12px', md: '16px' } }}>
            {hasNoRhymes ? (
              <NoDataMessage type={DataType.RHYMES} lyric={selectedLyric} />
            ) : (
              rhymes.map((rhyme, index) => {
                const isLast = index === rhymes.length - 1 ? true : false;
                return <ResultSpan key={`rhyme-${index}`} result={rhyme} isLast={isLast} />;
              })
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ fontSize: { xs: '12px', sm: '12px', md: '16px' } }}>
            {hasNoSynonyms ? (
              <NoDataMessage type={DataType.SYNONYMS} lyric={selectedLyric} />
            ) : (
              synonyms.map((synonym, index) => {
                const isLast = index === rhymes.length - 1 ? true : false;
                return <ResultSpan key={`synonym-${index}`} result={synonym} isLast={isLast} />;
              })
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box sx={{ fontSize: { xs: '12px', sm: '12px', md: '16px' } }}>
            {hasNoRelatedWords ? (
              <NoDataMessage type={DataType.RELATED_WORDS} lyric={selectedLyric} />
            ) : (
              relatedWords.map((relatedWord, index) => {
                const isLast = index === rhymes.length - 1 ? true : false;
                return (
                  <ResultSpan key={`related-word-${index}`} result={relatedWord} isLast={isLast} />
                );
              })
            )}
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};
