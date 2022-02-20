import React from 'react';
import { Box } from 'native-base';
import PlayerIcon from './PlayerIcon';
import FullCourt from './FullCourt';

const Whiteboard = () => {
  return (
    <Box bg="white" w="100%" h="100%" p={5}>
      {/* whiteboard
      <PlayerIcon /> */}
      <FullCourt />
    </Box>
  );
};

export default Whiteboard;
