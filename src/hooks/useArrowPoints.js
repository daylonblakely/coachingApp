import { useEffect } from 'react';
import {
  runOnJS,
  useSharedValue,
  useAnimatedReaction,
  useAnimatedProps,
} from 'react-native-reanimated';
import { createPath, addArc, serialize } from 'react-native-redash';
import useDraggable from './useDraggable';

const SNAP_THRESHOLD = 20; // min distance from straight line for curve

const triangleHeight = (a, b, c) => {
  'worklet';

  const distance = (a, b) => {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  };

  const ab = distance(a, b);
  const ac = distance(a, c);
  const bc = distance(b, c);

  const p = ab + ac + bc;
  const s = p / 2;

  const T = Math.sqrt(s * (s - ab) * (s - ac) * (s - bc));
  return (2 * T) / ab;
};

// determines if line is straight
const isStraight = (a, b, c) => {
  'worklet';
  return triangleHeight(a, b, c) < SNAP_THRESHOLD;
};

// gets a path object with one arc for three positions (sharedValues)
const getPath = (playerPos, posMid, posEnd) => {
  'worklet';
  const p = createPath(playerPos.value);
  addArc(p, posMid.value, posEnd.value);
  return p;
};

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
      runOnJS(updatePathWrapper)(getPath(playerPos, posMid, posEnd));
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
    const p = getPath(playerPos, posMid, posEnd);
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
