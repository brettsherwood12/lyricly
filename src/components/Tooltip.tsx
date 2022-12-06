import type { Lyric } from '../Types';

import React, { useState } from 'react';
import { Box, Select, MenuItem, Button } from '@mui/material';

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
  p: 1,
};

const wordDataSx = {
  maxHeight: '160px',
  overflowY: 'auto',
  backgroundColor: 'white',
  borderRadius: '4px',
  p: 1,
};

export const Tooltip = ({ lyric }: { lyric: Lyric }) => {
  const [wordData, setWordData] = useState<WordData[]>([]);
  const [dataType, setDataType] = useState(DataType.RHYMES);
  const [isLoaded, setIsLoaded] = useState(false);

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
    <div className="custom-tooltip" contentEditable="false">
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
          </Box>
        )}
      </Box>
    </div>
  );
};
