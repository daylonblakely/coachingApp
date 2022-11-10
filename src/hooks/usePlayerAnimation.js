import { useEffect, useMemo, useContext, useState } from 'react';
import {
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import * as path from 'svg-path-properties';
import { serialize } from 'react-native-redash';
import { Context as PlayContext } from '../context/PlayContext';

const ANIMATION_DURATION = 2000;

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

export default (playerPos, pathToNextPos) => {
  const {
    state: { shouldAnimate },
    stopAnimating,
  } = useContext(PlayContext);
  const [error, setError] = useState(null);

  const shouldAnimateShared = useSharedValue(false);
  const progress = useSharedValue(0);

  const [pointsAtLength, totalLength] = useMemo(
    () => getPointsAtLength(pathToNextPos),
    [pathToNextPos]
  );

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

    const runAnimation = () => {
      try {
        console.log('START ANIMATION');

        progress.value = withTiming(
          totalLength,
          { duration: ANIMATION_DURATION },
          (finished) => {
            if (finished) {
              console.log('ANIMATION ENDED');
              shouldAnimateShared.value = false;
              progress.value = 0;

              // TODO - figure out a way to stop animating ONCE
              // after all are finished
              // this should avoid extra renders
              runOnJS(stopAnimating)();
            } else {
              console.log('ANIMATION CANCELLED');
            }
          }
        );
      } catch (error) {
        setError(error);
      }
    };

    if (shouldAnimate) {
      runAnimation();
    }
  }, [shouldAnimate]);

  return [error];
};
