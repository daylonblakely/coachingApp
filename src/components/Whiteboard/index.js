import React from 'react';
import { Animated, StyleSheet, Button } from 'react-native';
import { Box } from 'native-base';
import useAnimation from '../../hooks/useAnimation';
import PlayerIcon from './PlayerIcon';
import FullCourt from './FullCourt';
import Arrow from './Arrow';

const Whiteboard = () => {
  const [position, panResponder] = useAnimation(200, 200);

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
      {/* <FullCourt /> */}
      <PlayerIcon position={position} panResponder={panResponder} />
      {/* <Button onPress={runPlay} title="run play" /> */}
      <Arrow />
    </Box>
  );
};

export default Whiteboard;
