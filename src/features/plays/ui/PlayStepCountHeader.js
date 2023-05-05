import React, { useContext } from 'react';
import { Box, Text } from 'native-base';
import { Context as PlayContext } from '../../../context/PlayContext';

const PlayStepCountHeader = () => {
  const {
    state: { currentPlay, currentStep },
  } = useContext(PlayContext);

  const stepLengths = currentPlay.players.map((p) => p?.steps.length || 1);
  const stepCount = Math.max(...stepLengths);

  return (
    <Box mx={5}>
      <Text color="white">{`Step ${currentStep + 1}/${stepCount}`}</Text>
    </Box>
  );
};

export default PlayStepCountHeader;
