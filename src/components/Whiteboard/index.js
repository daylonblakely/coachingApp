import React, { useContext } from 'react';
import { Box, useColorModeValue } from 'native-base';
import Svg from 'react-native-svg';
import PlayerIcon from './PlayerIcon';
import FullCourt from './FullCourt';

import { Context as PlayContext } from '../../context/PlayContext';

const Whiteboard = ({ playId }) => {
  const lineColor = useColorModeValue('black', 'white');

  const {
    state: { currentPlay, runStep, isEditMode, shouldAnimate },
    updateCurrentPlayerPath,
  } = useContext(PlayContext);

  const renderPlayers = () => {
    return currentPlay.steps[runStep].players.map((player) => (
      <PlayerIcon
        player={player}
        arrowColor={lineColor}
        key={player.id}
        isEditMode={isEditMode}
        shouldAnimate={shouldAnimate}
        afterMoveCallback={updateCurrentPlayerPath(player.id)}
      />
    ));
  };

  return (
    <Box flex={1} padding={3}>
      <FullCourt color={lineColor} />
      <Box position="absolute" w="100%" h="100%">
        <Svg>{renderPlayers()}</Svg>
      </Box>
    </Box>
  );
};

export default Whiteboard;
