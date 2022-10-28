import React, { useContext } from 'react';
import { Circle, Text } from 'native-base';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useArrowPoints from '../../hooks/useArrowPoints';
import usePlayerAnimation from '../../hooks/usePlayerAnimation';
import { Context as PlayContext } from '../../context/PlayContext';
import { Context as PlayerContext } from '../../context/PlayerContext';

import Arrow from './Arrow';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayerIcon = ({ player, arrowColor }) => {
  const {
    state: { isEditMode, isAnimating },
    stopAnimating,
  } = useContext(PlayContext);
  const { updatePath } = useContext(PlayerContext);

  const { x: initPlayerX, y: initPlayerY } = player.initialPos;
  const { initialPathToNextPos } = player;
  const playerPos = useSharedValue({ x: initPlayerX, y: initPlayerY });

  usePlayerAnimation(player.id, playerPos, isAnimating, stopAnimating);

  // const step = player.steps[state.runStep];

  const {
    gestureHandlerPlayer,
    animatedStylePlayer,
    gestureHandlerEnd,
    animatedStyleEnd,
    gestureHandlerMid,
    animatedStyleMid,
    animatedPropsArrow,
  } = useArrowPoints(
    initialPathToNextPos,
    playerPos,
    !isAnimating && isEditMode,
    updatePath(player.id)
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
            {player.label}
          </Text>
        </AnimatedCircle>
      </PanGestureHandler>
    </>
  );
};

export default PlayerIcon;
