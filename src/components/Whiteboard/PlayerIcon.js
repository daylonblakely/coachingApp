import React from 'react';
import { Circle, Text } from 'native-base';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { createPath, addArc } from 'react-native-redash';
import useArrowPoints from '../../hooks/useArrowPoints';
import usePlayerAnimation from '../../hooks/usePlayerAnimation';

import Arrow from './Arrow';

// TODO - clean up helper functions into utils
// remove duplicated code from useArrowPoints (getPath)
// update next path after animation

const DEFAULT_ARROW_LENGTH = 100;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const getInitialPositions = (initPlayerX, initPlayerY, pathToNextPos) => {
  // get last curve of an existing path
  const lastCurve = pathToNextPos?.curves[pathToNextPos.curves.length - 1];

  // endX defaults to X val of the player
  // endY defaults to player Y - DEFAULT_LENGTH to make vertical arrow
  const initEndX = lastCurve?.to.x || initPlayerX;
  const initEndY = lastCurve?.to.y || initPlayerY - DEFAULT_ARROW_LENGTH;

  // handle curves in saved plays for midpoint
  // c2 === to on straight curves
  const isInitStraight =
    lastCurve?.c2.x === lastCurve?.to.x && lastCurve?.c2.y === lastCurve?.to.y;

  const initMidX =
    lastCurve && !isInitStraight
      ? (lastCurve.c2.x - initEndX) / (9 / 16) + initEndX //https://github.com/wcandillon/react-native-redash/blob/master/src/Paths.ts
      : (initPlayerX + initEndX) / 2;

  const initMidY =
    lastCurve && !isInitStraight
      ? (lastCurve.c2.y - initEndY) / (9 / 16) + initEndY
      : (initPlayerY + initEndY) / 2;

  return { initEndX, initEndY, initMidX, initMidY };
};

// gets a path object with one arc for three positions (sharedValues)
const getPath = (playerPos, posMid, posEnd) => {
  const p = createPath(playerPos);
  addArc(p, posMid, posEnd);
  return p;
};

const PlayerIcon = ({
  player,
  arrowColor,
  isEditMode,
  shouldAnimate,
  afterMoveCallback,
}) => {
  // how to transition from one path to another when running plays????
  console.log('---------RENDERING PLAYER: ', player.id);

  const {
    pathToNextPos,
    initialPos: { x, y },
    label,
  } = player;
  const playerPos = useSharedValue({ x, y });
  const { initEndX, initEndY, initMidX, initMidY } = getInitialPositions(
    playerPos.value.x,
    playerPos.value.y,
    pathToNextPos
  );
  const posEnd = useSharedValue({ x: initEndX, y: initEndY });
  const posMid = useSharedValue({ x: initMidX, y: initMidY });

  usePlayerAnimation(playerPos, pathToNextPos, shouldAnimate, () => {
    // stopAnimating();
    const { initEndX, initEndY, initMidX, initMidY } = getInitialPositions(
      playerPos.value.x,
      playerPos.value.y
    );

    posEnd.value = { x: initEndX, y: initEndY };
    posMid.value = { x: initMidX, y: initMidY };
    afterMoveCallback(
      getPath(
        playerPos.value,
        { x: initMidX, y: initMidY },
        { x: initEndX, y: initEndY }
      )
    );
  });

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
