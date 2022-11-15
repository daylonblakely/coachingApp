import { useContext, useMemo, useEffect } from 'react';
import { useAnimatedReaction, interpolate } from 'react-native-reanimated';
import * as path from 'svg-path-properties';
import { serialize } from 'react-native-redash';
import { getInitialPositions } from '../utils/pathUtils';
import { Context as PlayContext } from '../context/PlayContext';

const getPointsAtLength = (pathToNextPos) => {
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

export default (
  playerPos,
  posMid,
  posEnd,
  pathToNextPos,
  animationProgress
) => {
  const {
    state: { runStep, shouldAnimate },
  } = useContext(PlayContext);

  const [pointsAtLength, totalLength] = useMemo(
    () => getPointsAtLength(pathToNextPos),
    [pathToNextPos]
  );

  useAnimatedReaction(
    () => {
      return Math.floor(
        interpolate(animationProgress.value, [0, 1], [0, totalLength])
      );
    },
    (result) => {
      if (shouldAnimate) {
        const { x, y } = pointsAtLength[result];
        playerPos.value = {
          x,
          y,
        };
      }
    },
    [pointsAtLength, shouldAnimate]
  );

  useEffect(() => {
    console.log('step changed...');
    const { initEndX, initEndY, initMidX, initMidY } =
      getInitialPositions(pathToNextPos);
    posEnd.value = { x: initEndX, y: initEndY };
    posMid.value = { x: initMidX, y: initMidY };
  }, [runStep]);
};
