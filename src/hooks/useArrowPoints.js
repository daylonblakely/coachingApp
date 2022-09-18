import useDraggable from './useDraggable';

const SNAP_THRESHOLD = 20; // min distance from straight line for curve
const DEFAULT_LENGTH = 100;

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

export default (player, isEditMode) => {
  const { x: initialPlayerX, y: initialPlayerY } = player.initialPos;
  const { initialPathToNextPos } = player;

  const [playerPos, gestureHandlerPlayer, animatedStylePlayer] = useDraggable(
    { initX: initialPlayerX, initY: initialPlayerY },
    isEditMode,
    () => {
      'worklet';

      //   runOnJS(wrapper)(player.id, {});
    }
  );

  const lastCurve =
    initialPathToNextPos?.curves[initialPathToNextPos.curves.length - 1];

  // c2 === to on straight curves
  const isInitStraight =
    lastCurve?.c2.x === lastCurve?.to.x && lastCurve?.c2.y === lastCurve?.to.y;

  const initEndX = lastCurve?.to.x || initialPlayerX;

  const initEndY = lastCurve?.to.y || initialPlayerY + DEFAULT_LENGTH;

  // handle curves in saved plays
  const initMidX =
    lastCurve && !isInitStraight
      ? (lastCurve.c2.x - initEndX) / (9 / 16) + initEndX //https://github.com/wcandillon/react-native-redash/blob/master/src/Paths.ts
      : (initialPlayerX + initEndX) / 2;

  const initMidY =
    lastCurve && !isInitStraight
      ? (lastCurve.c2.y - initEndY) / (9 / 16) + initEndY
      : (initialPlayerY + initEndY) / 2;

  const [posEnd, gestureHandlerEnd, animatedStyleEnd] = useDraggable(
    {
      initX: initEndX,
      initY: initEndY,
    },
    isEditMode
  );

  // set initial midpoint for existing path
  const [posMid, gestureHandlerMid, animatedStyleMid] = useDraggable(
    {
      initX: initMidX,
      initY: initMidY,
    },
    isEditMode,
    (pos) => {
      'worklet';
      // snap position to middle if line is almost straight
      if (isStraight(playerPos.value, posEnd.value, pos.value)) {
        pos.value = {
          ...pos.value,
          x: (playerPos.value.x + posEnd.value.x) / 2,
          y: (playerPos.value.y + posEnd.value.y) / 2,
        };
      }
    }
  );

  return {
    playerPos,
    gestureHandlerPlayer,
    animatedStylePlayer,
    posEnd,
    gestureHandlerEnd,
    animatedStyleEnd,
    posMid,
    gestureHandlerMid,
    animatedStyleMid,
    isInitStraight,
  };
};
