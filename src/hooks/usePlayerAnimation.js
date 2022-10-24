import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

export default (playerPos, shouldAnimate, callback) => {
  const shouldAnimateShared = useSharedValue(false);
  const progress = useSharedValue(0);

  useAnimatedReaction(
    () => {
      return progress.value;
    },
    (result) => {
      if (shouldAnimateShared.value)
        playerPos.value = { x: playerPos.value.x + 1, y: playerPos.value.y };
    }
  );

  useEffect(() => {
    shouldAnimateShared.value = shouldAnimate;
    if (shouldAnimate) {
      console.log('start animation');
      progress.value = withTiming(
        progress.value + 100,
        { duration: 2000 },
        (finished) => {
          if (finished) {
            console.log('ANIMATION ENDED');
            // progress.value = playerPos.value.x;
            // callback();
            runOnJS(callback)();
          } else {
            console.log('ANIMATION GOT CANCELLED');
          }
        }
      );
    }
  }, [shouldAnimate]);
};
