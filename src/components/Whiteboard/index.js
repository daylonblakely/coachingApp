import React, { useContext } from 'react';
import { Box, useColorModeValue } from 'native-base';
import Svg from 'react-native-svg';
import { useSharedValue } from 'react-native-reanimated';
import PlayerIcon from './PlayerIcon';
import FullCourt from './FullCourt';
import usePlayerAnimation from '../../hooks/usePlayerAnimation2';

import { Context as PlayContext } from '../../context/PlayContext';

const Whiteboard = ({}) => {
  console.log('--------------RENDER WHITEBOARD');
  const lineColor = useColorModeValue('black', 'white');

  const {
    state: { currentPlay, runStep, isEditMode, shouldAnimate },
    updateCurrentPlayerPath,
    stopAnimating,
  } = useContext(PlayContext);

  // TODO - add a position shared value to each player in context
  // then access those positions from an animation hook
  // return a function from the hook to run animations for all players
  // use the function in an onclick somewhere
  // figure out a way to have a single callback after all animations finish
  // const playerPositions = players.map(
  //   ({
  //     pathToNextPos: {
  //       move: { x, y },
  //     },
  //     id,
  //   }) => {
  //     console.log('heeerrrrrr');
  //     return { pos: useSharedValue({ x, y }), playerId: id };
  //   }
  // );
  // usePlayerAnimation(playerPositions);

  const renderPlayers = () => {
    return currentPlay?.players.map((player, i) => (
      <PlayerIcon
        label={player.label}
        // playerPos={playerPositions[i].pos}
        pathToNextPos={player.steps[runStep].pathToNextPos}
        arrowColor={lineColor}
        key={player.id}
        isEditMode={isEditMode}
        shouldAnimate={shouldAnimate}
        afterMoveCallback={updateCurrentPlayerPath(player.id)}
        afterAnimateCallback={stopAnimating}
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
