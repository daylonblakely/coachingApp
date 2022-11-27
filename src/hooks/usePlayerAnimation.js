import { useContext, useMemo } from 'react';
import { useAnimatedReaction, interpolate } from 'react-native-reanimated';
import * as path from 'svg-path-properties';
import { serialize } from 'react-native-redash';
import { Context as PlayContext } from '../context/PlayContext';

// map path to an array of coordinates and the total length of the path
const getPointsAtLength = (pathToNextPos) => {
  if (!pathToNextPos) return [[], 0];

  const properties =
    pathToNextPos.move && path.svgPathProperties(serialize(pathToNextPos));
  const totalLength = properties?.getTotalLength();

  return [
    Array(Math.floor(totalLength + 1 || 0)) // + 1 to avoid destructuring undefined in animation hook
      .fill()
      .map((_, i) => properties.getPointAtLength(i)),
    totalLength,
  ];
};

export default (playerPos, playerId, animationProgress) => {
  const {
    state: { runStep, currentPlay },
  } = useContext(PlayContext);

  const { pathToNextPos } = currentPlay.players.find(
    ({ id }) => playerId === id
  ).steps[runStep];

  const [pointsAtLength, totalLength] = useMemo(
    () => getPointsAtLength(pathToNextPos),
    [pathToNextPos]
  );

  // as the animation progress changes, interpolate that value to the total length of the current path
  // and update the player position to the coords at that length
  useAnimatedReaction(
    () => {
      return Math.floor(
        interpolate(animationProgress.value, [0, 1], [0, totalLength])
      );
    },
    (result) => {
      if (result > 0) {
        const { x, y } = pointsAtLength[result];
        playerPos.value = {
          x,
          y,
        };
      }
    },
    [pointsAtLength]
  );
};
