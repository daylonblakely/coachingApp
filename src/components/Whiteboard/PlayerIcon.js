import React, { useState, useContext } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Circle } from 'native-base';
import Animated, { runOnJS } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useArrowPoints from '../../hooks/useArrowPoints';
import { Context as PlayContext } from '../../context/PlayContext';

import Arrow from './Arrow';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayerIcon = ({ player }) => {
  const {
    state: { isEditMode },
  } = useContext(PlayContext);
  // const step = player.steps[state.runStep];

  const {
    playerPos,
    gestureHandlerPlayer,
    animatedStylePlayer,
    posEnd,
    gestureHandlerEnd,
    animatedStyleEnd,
    posMid,
    gestureHandlerMid,
    animatedStyleMid,
    isInitStraight,
  } = useArrowPoints(player, isEditMode);

  return (
    <>
      <Arrow
        playerPos={playerPos}
        posEnd={posEnd}
        gestureHandlerEnd={gestureHandlerEnd}
        animatedStyleEnd={animatedStyleEnd}
        posMid={posMid}
        gestureHandlerMid={gestureHandlerMid}
        animatedStyleMid={animatedStyleMid}
        isInitStraight={isInitStraight}
      />

      <PanGestureHandler onGestureEvent={gestureHandlerPlayer}>
        <AnimatedCircle
          style={[styles.container, animatedStylePlayer]}
          size="xs"
          //   bg={useColorModeValue('secondary.600', 'primary.600')}
          _text={{
            fontWeight: 'bold',
            fontSize: '3xl',
          }}
          bg="secondary.600"
        >
          {player.label}
        </AnimatedCircle>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default PlayerIcon;
