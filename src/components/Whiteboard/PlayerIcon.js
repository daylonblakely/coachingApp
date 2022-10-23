import React, { useState, useContext } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Circle, Text } from 'native-base';
import Animated, { runOnJS } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useArrowPoints from '../../hooks/useArrowPoints';
import { Context as PlayContext } from '../../context/PlayContext';

import Arrow from './Arrow';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayerIcon = ({ player, arrowColor }) => {
  const {
    state: { isEditMode },
  } = useContext(PlayContext);
  // const step = player.steps[state.runStep];

  const {
    gestureHandlerPlayer,
    animatedStylePlayer,
    gestureHandlerEnd,
    animatedStyleEnd,
    gestureHandlerMid,
    animatedStyleMid,
    animatedPropsArrow,
  } = useArrowPoints(player, isEditMode);

  return (
    <>
      <Arrow
        gestureHandlerEnd={gestureHandlerEnd}
        animatedStyleEnd={animatedStyleEnd}
        gestureHandlerMid={gestureHandlerMid}
        animatedStyleMid={animatedStyleMid}
        animatedPropsArrow={animatedPropsArrow}
        color={arrowColor}
      />

      <PanGestureHandler onGestureEvent={gestureHandlerPlayer}>
        <AnimatedCircle
          style={[styles.container, animatedStylePlayer]}
          size="xs"
          //   bg={useColorModeValue('secondary.600', 'primary.600')}
          // _text={{
          //   fontWeight: 'bold',
          //   fontSize: '3xl',
          // }}
          bg="secondary.600"
        >
          <Text color="white" fontSize="xl">
            {player.label}
          </Text>
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
