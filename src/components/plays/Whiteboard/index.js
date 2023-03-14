import React, { useContext, useEffect } from 'react';
import { Box, useColorModeValue } from 'native-base';
import Svg from 'react-native-svg';
import { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import PlayerIcon from './PlayerIcon';
import FullCourt from './FullCourt';

import { Context as PlayContext } from '../../../context/PlayContext';

const ANIMATION_DURATION = 2000;

const Whiteboard = () => {
  console.log('--------------RENDER WHITEBOARD');
  const lineColor = useColorModeValue('black', 'white');

  const {
    state: { currentPlay, currentStep, shouldAnimatePlay, shouldAnimateStep },
    stopStepAnimation,
    stopPlayAnimation,
  } = useContext(PlayContext);

  const animationProgress = useSharedValue(0);

  const runAnimation = (isStep) => {
    console.log('START ANIMATION');

    animationProgress.value = withTiming(
      1,
      { duration: ANIMATION_DURATION },
      (finished) => {
        if (finished) {
          console.log('ANIMATION ENDED');
          animationProgress.value = 0;

          if (isStep) {
            // set next path and run step when done animating
            runOnJS(stopStepAnimation)(currentStep, currentPlay.players);
          } else {
            runOnJS(stopPlayAnimation)(currentStep, currentPlay.players);
          }
        } else {
          console.log('ANIMATION CANCELLED');
        }
      }
    );
  };

  useEffect(() => {
    if (shouldAnimatePlay || shouldAnimateStep) {
      runAnimation(shouldAnimateStep);
    }
  });

  const renderPlayers = () => {
    return currentPlay?.players.map((player) => {
      return player ? (
        <PlayerIcon
          playerId={player.id}
          animationProgress={animationProgress}
          label={player.label}
          arrowColor={lineColor}
          key={player.id}
        />
      ) : null;
    });
  };

  return (
    <Box flex={1} padding={3}>
      <FullCourt color={lineColor} />
      <Box position="absolute" w="100%" h="100%">
        <Svg>{currentPlay.players.length && renderPlayers()}</Svg>
      </Box>
    </Box>
  );
};

export default Whiteboard;
