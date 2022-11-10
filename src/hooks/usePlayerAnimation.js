import { useMemo } from 'react';
import { useAnimatedReaction, interpolate } from 'react-native-reanimated';
import * as path from 'svg-path-properties';
import { serialize } from 'react-native-redash';

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

export default (playerPos, pathToNextPos, animationProgress) => {
  const [pointsAtLength, totalLength] = useMemo(
    () => getPointsAtLength(pathToNextPos),
    [pathToNextPos]
  );

  useAnimatedReaction(
    () => {
      return Math.floor(
        interpolate(animationProgress.value, [0, 100], [0, totalLength])
      );
    },
    (result) => {
      const { x, y } = pointsAtLength[result];
      playerPos.value = {
        x,
        y,
      };
    },
    [pointsAtLength]
  );
};
