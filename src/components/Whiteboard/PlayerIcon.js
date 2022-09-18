import React, { useState, useContext } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Circle } from 'native-base';
import Animated, { runOnJS } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useDraggable from '../../hooks/useDraggable';
import { Context as PlayContext } from '../../context/PlayContext';
import { Context as PlayerContext } from '../../context/PlayerContext';

import Arrow from './Arrow';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayerIcon = ({ player }) => {
  const {
    state: { isEditMode },
  } = useContext(PlayContext);
  // const step = player.steps[state.runStep];
  const { updatePath } = useContext(PlayerContext);

  const wrapper = (a, b) => updatePath(a, b);

  const [pos, gestureHandler, animatedStyle] = useDraggable(
    { initX: player.initialPos.x, initY: player.initialPos.y },
    isEditMode,
    () => {
      'worklet';

      runOnJS(wrapper)(player.id, {});
    }
  );

  return (
    <>
      {/* <Arrow positionStart={position} /> */}
      <Arrow
        playerPos={pos}
        initPath={player.initialPathToNextPos}
        isEditMode={isEditMode}
      />

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <AnimatedCircle
          style={[styles.container, animatedStyle]}
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
