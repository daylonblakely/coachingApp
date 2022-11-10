import React, { useContext, useEffect } from 'react';
import { Box, useColorModeValue } from 'native-base';
import Svg from 'react-native-svg';
import { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import PlayerIcon from './PlayerIcon';
import FullCourt from './FullCourt';

import { Context as PlayContext } from '../../context/PlayContext';

const ANIMATION_DURATION = 2000;

const Whiteboard = ({}) => {
  console.log('--------------RENDER WHITEBOARD');
  const lineColor = useColorModeValue('black', 'white');

  const {
    state: { currentPlay, runStep, isEditMode, shouldAnimate },
    updateCurrentPlayerPath,
    stopAnimating,
  } = useContext(PlayContext);

  const animationProgress = useSharedValue(0);

  const runAnimation = () => {
    console.log('START ANIMATION');

    animationProgress.value = withTiming(
      100,
      { duration: ANIMATION_DURATION },
      (finished) => {
        if (finished) {
          console.log('ANIMATION ENDED');
          animationProgress.value = 0;
          runOnJS(stopAnimating)();
        } else {
          console.log('ANIMATION CANCELLED');
        }
      }
    );
  };

  useEffect(() => {
    if (shouldAnimate) {
      runAnimation();
    }
  }, [shouldAnimate]);

  const renderPlayers = () => {
    return currentPlay?.players.map((player, i) => (
      <PlayerIcon
        label={player.label}
        pathToNextPos={player.steps[runStep].pathToNextPos}
        arrowColor={lineColor}
        isEditMode={isEditMode}
        shouldAnimate={shouldAnimate}
        afterMoveCallback={updateCurrentPlayerPath(player.id)}
        animationProgress={animationProgress}
        key={player.id}
      />
    ));
  };

  return (
    <Box flex={1} padding={3}>
      <FullCourt color={lineColor} />
      <Box position="absolute" w="100%" h="100%">
        <Svg>{renderPlayers()}</Svg>
      </Box>
    </Box>
  );
};

export default Whiteboard;
