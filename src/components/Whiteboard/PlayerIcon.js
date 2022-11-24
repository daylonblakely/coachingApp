import React from 'react';
import { Circle, Text } from 'native-base';
import Animated from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
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

  const longPressGesture = Gesture.LongPress().onStart((_event) => {
    // popupPosition.value = { x: offset.value.x, y: offset.value.y };
    // popupAlpha.value = withTiming(1);
    console.log('long press');
  });

  const composed = Gesture.Race(gestureHandlerPlayer, longPressGesture);

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

      <GestureDetector gesture={composed}>
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
      </GestureDetector>
    </>
  );
};

export default PlayerIcon;
