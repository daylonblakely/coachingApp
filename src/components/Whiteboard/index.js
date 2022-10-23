import React, { useContext } from 'react';
import { Box, useColorModeValue } from 'native-base';
import Svg from 'react-native-svg';
import PlayerIcon from './PlayerIcon';
import FullCourt from './FullCourt';

import { Context as PlayerContext } from '../../context/PlayerContext';

const Whiteboard = () => {
  const lineColor = useColorModeValue('black', 'white');

  const { state: players } = useContext(PlayerContext);

  const renderPlayers = () => {
    return Object.keys(players).map((playerId) => (
      <PlayerIcon
        player={players[playerId]}
        arrowColor={lineColor}
        key={playerId}
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
