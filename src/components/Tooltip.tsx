import type { Lyric } from '../Types';

import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Box, Typography, Select, MenuItem, Button } from '@mui/material';

import { fetchWordData } from '../utils/fetchWordData';

import { DataType } from '../Types';

interface WordData {
  word: string;
  score: number;
}

const tooltipSx = {
  position: 'absolute',
  width: '256px',
  zIndex: 1000,
  backgroundColor: 'lightgray',
  borderRadius: '8px',
  boxShadow: 2,
  p: 1,
};

const resultsSx = {
  backgroundColor: 'white',
  borderRadius: '4px',
  p: 1,
};

const wordDataSx = {
  maxHeight: '160px',
  overflowY: 'auto',
};

const noWordDataSx = {
  height: '96px',
  textAlign: 'center',
  pt: 2,
};

export const Tooltip = ({ lyric }: { lyric: Lyric }) => {
  const [wordData, setWordData] = useState<WordData[]>([]);
  const [dataType, setDataType] = useState(DataType.RHYMES);
  const [isLoaded, setIsLoaded] = useState(false);

  const hasWords = !isEmpty(wordData);
  const noWordsString = dataType === DataType.RELATED ? `${dataType} words` : dataType;

  const handleSelectChange = (event: any) => {
    console.log(event.target.value);
    setDataType(event.target.value);
  };

  const handleButtonClick = async () => {
    const data = await fetchWordData(lyric.word, dataType);
    setIsLoaded(true);
    setWordData(data);
  };

  return (
    <div contentEditable="false">
      <Box sx={tooltipSx}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box mr={1}>
            <span style={{ fontSize: '28px' }}>&#129300;</span>
          </Box>
          <Box mr={1}>
            <Select
              value={dataType}
              onChange={handleSelectChange}
              size="small"
              sx={{ width: '128px', backgroundColor: 'white' }}
            >
              <MenuItem value={DataType.RHYMES}>Rhymes</MenuItem>
              <MenuItem value={DataType.SYNONYMS}>Synonyms</MenuItem>
              <MenuItem value={DataType.RELATED}>Related Words</MenuItem>
            </Select>
          </Box>
          <Box>
            <Button variant="contained" size="small" onClick={handleButtonClick}>
              Find
            </Button>
          </Box>
        </Box>
        {isLoaded && (
          <Box sx={{ height: '100%', pt: 1 }}>
            <Box sx={resultsSx}>
              {hasWords ? (
                <Box sx={wordDataSx}>
                  {wordData.map((data, index) => {
                    const isLastWord = index === wordData.length - 1 ? true : false;
                    return (
                      <span>
                        {data.word}
                        {isLastWord ? '' : ', '}
                      </span>
                    );
                  })}
                </Box>
              ) : (
                <Box sx={noWordDataSx}>
                  <Typography variant="subtitle1">
                    No {noWordsString} found for {lyric.word}.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};
