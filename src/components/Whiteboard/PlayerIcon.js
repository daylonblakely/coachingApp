import React from 'react';
import { Circle, Text } from 'native-base';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useArrowPoints from '../../hooks/useArrowPoints';
import usePlayerAnimation from '../../hooks/usePlayerAnimation2';
import { getPath, getInitialPositions } from '../../utils/pathUtils';

import Arrow from './Arrow';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayerIcon = ({
  player,
  playerPos,
  arrowColor,
  isEditMode,
  shouldAnimate,
  afterMoveCallback,
  afterAnimateCallback,
}) => {
  // how to transition from one path to another when running plays????
  console.log('---------RENDERING PLAYER: ', player.id);

  const {
    pathToNextPos,
    initialPos: { x, y },
    label,
  } = player;
  // const playerPos = useSharedValue({ x, y });
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

  // usePlayerAnimation(player.id, playerPos);

  const {
    gestureHandlerPlayer,
    animatedStylePlayer,
    gestureHandlerEnd,
    animatedStyleEnd,
    gestureHandlerMid,
    animatedStyleMid,
    animatedPropsArrow,
  } = useArrowPoints(
    playerPos,
    posEnd,
    posMid,
    !shouldAnimate && isEditMode,
    afterMoveCallback
  );

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
