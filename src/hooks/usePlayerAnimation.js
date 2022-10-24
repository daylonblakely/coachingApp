import { useContext, useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { getYForX } from 'react-native-redash';
import { Context as PlayerContext } from '../context/PlayerContext';

export default (playerId, playerPos, shouldAnimate, callback) => {
  const { state } = useContext(PlayerContext);
  const path = state[playerId].currentPathToNextPos;
  const shouldAnimateShared = useSharedValue(false);
  const progress = useSharedValue(0);

  useAnimatedReaction(
    () => {
      return progress.value;
    },
    (result) => {
      if (shouldAnimateShared.value)
        playerPos.value = {
          x: playerPos.value.x + 1,
          y: getYForX(path, playerPos.value.x + 1),
        };
    }
  );

  useEffect(() => {
    shouldAnimateShared.value = shouldAnimate;
    if (shouldAnimate) {
      console.log('start animation');
      progress.value = withTiming(100, { duration: 2000 }, (finished) => {
        if (finished) {
          console.log('ANIMATION ENDED');
          shouldAnimateShared.value = false;
          progress.value = 0;
          runOnJS(callback)();
        } else {
          console.log('ANIMATION GOT CANCELLED');
        }
      });
    }
  }, [shouldAnimate]);
};
