import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Circle } from 'native-base';

import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useDraggable from '../../hooks/useDraggable';

import Arrow2 from './Arrow';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayerIcon = () => {
  const [isMovable, setIsMovable] = useState(true);
  const [pos, gestureHandler, animatedStyle] = useDraggable({
    initX: 200,
    initY: 200,
  });

  return (
    <>
      {/* <Arrow positionStart={position} /> */}
      <Arrow2 playerPos={pos} />

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
        />
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
