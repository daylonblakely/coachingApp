import React, { useContext } from 'react';
import { Circle, Text } from 'native-base';
import Animated from 'react-native-reanimated';
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
