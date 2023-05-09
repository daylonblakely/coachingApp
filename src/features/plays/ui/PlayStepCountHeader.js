import React, { useContext } from 'react';
import { Box, Text } from 'native-base';
import { numberOfSteps } from '../utils/playUtils';
import { Context as PlayContext } from '../PlayContext';

const PlayStepCountHeader = () => {
  const {
    state: { currentPlay, currentStep },
  } = useContext(PlayContext);

  const stepCount = numberOfSteps(currentPlay);

  return (
    <Box mx={5}>
      <Text color="white">{`Step ${currentStep + 1}/${stepCount}`}</Text>
    </Box>
  );
};

export default PlayStepCountHeader;
