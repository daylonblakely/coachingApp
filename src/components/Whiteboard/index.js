import React, { useContext } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Box } from 'native-base';
import Svg from 'react-native-svg';
import PlayerIcon from './PlayerIcon';
import FullCourt from './FullCourt';

import { Context as PlayContext } from '../../context/PlayContext';

const Whiteboard = () => {
  const { state } = useContext(PlayContext);

  const renderPlayers = () => {
    return state.players.map((player) => (
      <PlayerIcon label={player.label} key={player.id} />
    ));
  };

  return (
    <Box bg="white" w="100%" h="100%">
      <FullCourt />

      {/* <Button onPress={runPlay} title="run play" /> */}
      {/* <Arrow /> */}

      <Box position="absolute" w="100%" h="100%">
        <Svg>{renderPlayers()}</Svg>
      </Box>
    </Box>
  );
};

export default Whiteboard;
