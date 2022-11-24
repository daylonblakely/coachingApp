import React from 'react';
import { Circle, Text } from 'native-base';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import usePlayerPosition from '../../hooks/usePlayerPosition';
import usePlayerAnimation from '../../hooks/usePlayerAnimation';
import Arrow from './Arrow';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayerIcon = ({ playerId, arrowColor, label, animationProgress }) => {
  console.log('---------RENDERING PLAYER: ', label);

  const {
    // position shared values
    playerPos,
    // gesture handlers
    gestureHandlerPlayer,
    gestureHandlerEnd,
    gestureHandlerMid,
    // animated styles/props
    animatedStylePlayer,
    animatedStyleMid,
    animatedStyleEnd,
    animatedPropsArrow,
  } = usePlayerPosition(playerId);

  usePlayerAnimation(playerPos, playerId, animationProgress);

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
          style={animatedStylePlayer}
          position="absolute"
          size="xs"
          bg="secondary.600"
        >
          <Text color="white" fontSize="xl">
            {label}
          </Text>
        </AnimatedCircle>
      </PanGestureHandler>
    </>
  );
};

export default PlayerIcon;
