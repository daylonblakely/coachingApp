import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import * as path from 'svg-path-properties';
import { serialize } from 'react-native-redash';

const ANIMATION_DURATION = 2000;

export default (playerPos, pathToNextPos, shouldAnimate, callback) => {
  const shouldAnimateShared = useSharedValue(false);
  const progress = useSharedValue(0);

  const properties =
    pathToNextPos.move && path.svgPathProperties(serialize(pathToNextPos));
  const totalLength = properties?.getTotalLength();
  const pointsAtLength = Array(Math.floor(totalLength + 1 || 0)) // + 1 to avoid destructuring undefined in animation hook
    .fill()
    .map((_, i) => properties.getPointAtLength(i));

  useAnimatedReaction(
    () => {
      return Math.floor(progress.value);
    },
    (result) => {
      if (shouldAnimateShared.value) {
        const { x, y } = pointsAtLength[result];
        playerPos.value = {
          x,
          y,
        };
      }
    },
    [pointsAtLength]
  );

  useEffect(() => {
    shouldAnimateShared.value = shouldAnimate;
    if (shouldAnimate) {
      console.log('START ANIMATION');

      progress.value = withTiming(
        totalLength,
        { duration: ANIMATION_DURATION },
        (finished) => {
          if (finished) {
            console.log('ANIMATION ENDED');
            shouldAnimateShared.value = false;
            progress.value = 0;
            runOnJS(callback)();
          } else {
            console.log('ANIMATION CANCELLED');
          }
        }
      );
    }
  }, [shouldAnimate]);
};
