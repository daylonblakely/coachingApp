import React from 'react';
import { Animated, StyleSheet, Button } from 'react-native';
import { Box } from 'native-base';
import PlayerIcon from './PlayerIcon';
import FullCourt from './FullCourt';

const Whiteboard = () => {
  // TODO find a way to run plays
  // const runPlay = () => {
  //   Animated.stagger(3000, [
  //     Animated.spring(position, {
  //       toValue: { x: 300, y: 200 },
  //       useNativeDriver: false,
  //     }),
  //     Animated.spring(position, {
  //       toValue: { x: 100, y: 200 },
  //       useNativeDriver: false,
  //     }),
  //   ]).start();
  // };

  return (
    <Box bg="white" w="100%" h="100%">
      <FullCourt />

      {/* <Button onPress={runPlay} title="run play" /> */}
      {/* <Arrow /> */}
      <PlayerIcon />
    </Box>
  );
};

export default Whiteboard;
