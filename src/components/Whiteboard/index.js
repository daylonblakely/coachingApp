import React, { useContext } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Box } from 'native-base';
import Svg from 'react-native-svg';
import PlayerIcon from './PlayerIcon';
import FullCourt from './FullCourt';

import { Context as PlayerContext } from '../../context/PlayerContext';

const Whiteboard = () => {
  const { state: players } = useContext(PlayerContext);

  const renderPlayers = () => {
    return Object.keys(players).map((playerId) => (
      <PlayerIcon player={players[playerId]} key={playerId} />
    ));
  };

  return (
    <Box bg="white" w="100%" h="100%">
      <FullCourt />

      {/* <Button onPress={runPlay} title="run play" /> */}

      <Box position="absolute" w="100%" h="100%">
        <Svg>{renderPlayers()}</Svg>
      </Box>
    </Box>
  );
};

export default Whiteboard;
