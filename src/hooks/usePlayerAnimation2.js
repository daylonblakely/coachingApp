import { useEffect, useContext } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import * as path from 'svg-path-properties';
import { serialize } from 'react-native-redash';
import { Context as PlayContext } from '../context/PlayContext';

const ANIMATION_DURATION = 2000;

export default (playerPositions) => {
  const {
    state: { shouldAnimate, runStep, currentPlay },
    stopAnimating,
  } = useContext(PlayContext);

  //   const shouldAnimateShared = useSharedValue(false);

  const progressValues = playerPositions.map(({ pos, playerId }) => {
    const { pathToNextPos } = currentPlay.steps[runStep].players.find(
      ({ id }) => id === playerId
    );

    const progress = useSharedValue(0);

    const properties = path.svgPathProperties(serialize(pathToNextPos));
    const totalLength = properties?.getTotalLength();
    const pointsAtLength = Array(Math.floor(totalLength + 1 || 0)) // + 1 to avoid destructuring undefined in animation hook
      .fill()
      .map((_, i) => properties.getPointAtLength(i));

    useAnimatedReaction(
      () => {
        return Math.floor(progress.value);
      },
      (result) => {
        // if (shouldAnimateShared.value) {
        const { x, y } = pointsAtLength[result];
        pos.value = {
          x,
          y,
        };
        // }
      },
      [pathToNextPos]
    );

    return { progress, totalLength };
  });

  const runAnimations = () => {
    progressValues.forEach(({ progress, totalLength }) => {
      progress.value = withTiming(
        totalLength,
        { duration: ANIMATION_DURATION },
        (finished) => {
          if (finished) {
            // shouldAnimateShared.value = false;
            progress.value = 0;
            // runOnJS(callback)();
          } else {
            console.log('ANIMATION CANCELLED');
          }
        }
      );
    });
  };

  useEffect(() => {
    // shouldAnimateShared.value = shouldAnimate;
    if (shouldAnimate) {
      console.log('START ANIMATION');
      runAnimations();
      stopAnimating();
      console.log('ANIMATION ENDED');
    }
  }, [shouldAnimate]);
};
