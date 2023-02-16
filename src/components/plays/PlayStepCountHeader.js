import React, { useContext } from 'react';
import { Box, Text } from 'native-base';
import { Context as PlayContext } from '../../context/PlayContext';

const PlayStepCountHeader = () => {
  const {
    state: { currentPlay, runStep },
  } = useContext(PlayContext);

  const stepLengths = currentPlay?.players.map((p) => p.steps.length);
  const stepCount = stepLengths ? Math.max(...stepLengths) : 1;

  return (
    <Box mx={5}>
      <Text>{`Step ${runStep + 1}/${stepCount}`}</Text>
    </Box>
  );
};

export default PlayStepCountHeader;
