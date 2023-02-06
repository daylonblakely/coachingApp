import React, { useContext } from 'react';
import { Box, Text } from 'native-base';
import { Context as PlayContext } from '../../context/PlayContext';

const PlayStepCountHeader = () => {
  const {
    state: { currentPlay, runStep },
  } = useContext(PlayContext);

  return (
    <Box mx={5}>
      <Text>{`Step ${runStep + 1}/${
        currentPlay.players[0].steps.length
      }`}</Text>
    </Box>
  );
};

export default PlayStepCountHeader;
