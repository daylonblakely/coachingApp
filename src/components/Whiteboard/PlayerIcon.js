import React from 'react';
import { Circle, Text } from 'native-base';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useArrowPoints from '../../hooks/useArrowPoints';
import usePlayerAnimation from '../../hooks/usePlayerAnimation';
import { getPath, getInitialPositions } from '../../utils/pathUtils';

import Arrow from './Arrow';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayerIcon = ({
  pathToNextPos,
  arrowColor,
  isEditMode,
  afterMoveCallback,
  label,
}) => {
  // how to transition from one path to another when running plays????
  console.log('---------RENDERING PLAYER: ', label);

  // const { pathToNextPos, label } = player;
  const playerPos = useSharedValue({
    x: pathToNextPos.move.x,
    y: pathToNextPos.move.y,
  });
  const { initEndX, initEndY, initMidX, initMidY } = getInitialPositions(
    playerPos.value.x,
    playerPos.value.y,
    pathToNextPos
  );
  const posEnd = useSharedValue({ x: initEndX, y: initEndY });
  const posMid = useSharedValue({ x: initMidX, y: initMidY });

  // () => {
  //   afterAnimateCallback();
  //   const { initEndX, initEndY, initMidX, initMidY } = getInitialPositions(
  //     playerPos.value.x,
  //     playerPos.value.y
  //   );

  //   posEnd.value = { x: initEndX, y: initEndY };
  //   posMid.value = { x: initMidX, y: initMidY };
  //   afterMoveCallback(
  //     getPath(
  //       playerPos.value,
  //       { x: initMidX, y: initMidY },
  //       { x: initEndX, y: initEndY }
  //     )
  //   );
  // }

  usePlayerAnimation(playerPos, pathToNextPos);

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
