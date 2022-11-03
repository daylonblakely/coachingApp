import { useEffect } from 'react';
import {
  runOnJS,
  useSharedValue,
  useAnimatedReaction,
  useAnimatedProps,
} from 'react-native-reanimated';
import { serialize } from 'react-native-redash';
import useDraggable from './useDraggable';
import { getPath, isStraight } from '../utils/pathUtils';

export default (playerPos, posEnd, posMid, shouldEdit, afterMoveCallback) => {
  const shouldEditShared = useSharedValue(shouldEdit);
  useEffect(() => {
    shouldEditShared.value = shouldEdit;
  }, [shouldEdit]);

  // setCurrentPath is a helper to update the state with current paths onEnd drag for player/position
  // https://docs.swmansion.com/react-native-reanimated/docs/api/miscellaneous/runOnJS/
  const updatePathWrapper = (path) => afterMoveCallback(path);
  const setCurrentPath = () => {
    'worklet';
    if (shouldEdit) {
      runOnJS(updatePathWrapper)(
        getPath(playerPos.value, posMid.value, posEnd.value)
      );
    }
  };

  // useDraggable returns gesture handlers for dragging positions
  const [gestureHandlerPlayer, animatedStylePlayer] = useDraggable(
    playerPos,
    shouldEdit,
    setCurrentPath
  );

  const [gestureHandlerEnd, animatedStyleEnd] = useDraggable(
    posEnd,
    shouldEdit,
    setCurrentPath
  );

  const [gestureHandlerMid, animatedStyleMid] = useDraggable(
    posMid,
    shouldEdit,
    (pos) => {
      'worklet';
      // snap position to middle if line is almost straight
      if (
        isStraight(playerPos.value, posEnd.value, pos.value) &&
        shouldEditShared.value
      ) {
        pos.value = {
          ...pos.value,
          x: (playerPos.value.x + posEnd.value.x) / 2,
          y: (playerPos.value.y + posEnd.value.y) / 2,
        };
      }

      setCurrentPath();
    }
  );

  // don't move midpoint on first render in useAnimatedReaction
  const shouldMoveMid = useSharedValue();
  useEffect(() => {
    shouldMoveMid.value = false;
  }, []);

  // moves midpoint when end or player are dragged
  useAnimatedReaction(
    () => {
      return {
        x: (playerPos.value.x + posEnd.value.x) / 2,
        y: (playerPos.value.y + posEnd.value.y) / 2,
      };
    },
    (result) => {
      if (shouldMoveMid.value && shouldEditShared.value) {
        posMid.value = result;
      }
      shouldMoveMid.value = true;
    },
    []
  );

  // moves arrow svg
  const animatedPropsArrow = useAnimatedProps(() => {
    if (!shouldEditShared.value) return {};
    const p = getPath(playerPos.value, posMid.value, posEnd.value);
    return { d: serialize(p) };
  });

  return {
    gestureHandlerPlayer,
    animatedStylePlayer,
    gestureHandlerEnd,
    animatedStyleEnd,
    gestureHandlerMid,
    animatedStyleMid,
    animatedPropsArrow,
  };
};
