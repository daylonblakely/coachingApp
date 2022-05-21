import React, { useContext } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Box } from 'native-base';
import Svg from 'react-native-svg';
import PlayerIcon from './PlayerIcon';
import FullCourt from './FullCourt';

import { Context as PlayContext } from '../../context/PlayContext';

const Whiteboard = ({ playId }) => {
  const { state } = useContext(PlayContext);
  const play = state.plays.find((p) => p.id === playId);

  const renderPlayers = () => {
    return play.players.map((player) => (
      <PlayerIcon player={player} key={player.id} />
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
