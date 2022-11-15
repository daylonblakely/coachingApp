import React, { useState } from 'react';
import { Circle, Text } from 'native-base';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useArrowPoints from '../../hooks/useArrowPoints';
import usePlayerAnimation from '../../hooks/usePlayerAnimation';
import { getInitialPositions } from '../../utils/pathUtils';
import Arrow from './Arrow';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayerIcon = ({
  pathToNextPos,
  arrowColor,
  afterMoveCallback,
  label,
  animationProgress,
  isEditMode,
}) => {
  console.log('---------RENDERING PLAYER: ', label);

  const [{ initPlayerX, initPlayerY, initEndX, initEndY, initMidX, initMidY }] =
    useState(() => getInitialPositions(pathToNextPos));

  const playerPos = useSharedValue({
    x: initPlayerX,
    y: initPlayerY,
  });
  const posMid = useSharedValue({ x: initMidX, y: initMidY });
  const posEnd = useSharedValue({ x: initEndX, y: initEndY });

  usePlayerAnimation(
    playerPos,
    posMid,
    posEnd,
    pathToNextPos,
    animationProgress
  );

  const {
    gestureHandlerPlayer,
    animatedStylePlayer,
    gestureHandlerEnd,
    animatedStyleEnd,
    gestureHandlerMid,
    animatedStyleMid,
    animatedPropsArrow,
  } = useArrowPoints(playerPos, posEnd, posMid, isEditMode, afterMoveCallback);

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
