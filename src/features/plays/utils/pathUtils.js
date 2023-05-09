import { createPath, addArc, addLine } from 'react-native-redash';
import { PLAYER_CIRCLE_SIZE } from '../constants';

const DEFAULT_LENGTH = 100; // default length of a straight line if no path is provided
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
export const isStraight = (a, b, c) => {
  'worklet';
  return triangleHeight(a, b, c) < SNAP_THRESHOLD;
};

const getPointOnLine = (x1, y1, x2, y2, distance) => {
  'worklet';
  // Calculate the length of the line segment
  const segmentLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  if (segmentLength <= distance) return [x1, y1];

  // Calculate the direction of the line segment
  const directionX = (x2 - x1) / segmentLength;
  const directionY = (y2 - y1) / segmentLength;

  // Calculate the x and y coordinates of the point on the line that is the given distance away from the first coordinate
  const pointX = x1 + distance * directionX;
  const pointY = y1 + distance * directionY;

  // Return the x and y coordinates of the point
  return [pointX, pointY];
};

// gets a path object with one arc for three positions (sharedValues)
export const getPath = (playerPos, posMid, posEnd) => {
  'worklet';
  // get coords up the line from the player so the arrow doesn't over lap the player
  const [x, y] = getPointOnLine(
    playerPos.x,
    playerPos.y,
    posMid.x,
    posMid.y,
    PLAYER_CIRCLE_SIZE + 5
  );

  const p = createPath({ x, y });
  addArc(p, posMid, posEnd);
  return p;
};

// get a path object for pass arrow (2 points), this is so the arrow isnt overlapped by the receiving player
export const getPassArrowPath = (posStart, posEnd) => {
  'worklet';

  // get coords up the line from the player so the arrow doesn't over lap the player
  const [x, y] = getPointOnLine(
    posEnd.x,
    posEnd.y,
    posStart.x,
    posStart.y,
    PLAYER_CIRCLE_SIZE + 30
  );

  const p = createPath(posStart);
  addLine(p, { x, y });
  return p;
};

// get (x,y) of mid and endpoints from a start position and a path object
export const getInitialPositions = (pathToNextPos) => {
  // init start
  const initPlayerX = pathToNextPos?.move.x;
  const initPlayerY = pathToNextPos?.move.y;

  // get last curve of an existing path
  const lastCurve = pathToNextPos?.curves[pathToNextPos.curves.length - 1];

  // endX defaults to X val of the player
  // endY defaults to player Y - DEFAULT_LENGTH to make vertical arrow
  const initEndX = lastCurve?.to.x || initPlayerX;
  const initEndY = lastCurve?.to.y || initPlayerY - DEFAULT_LENGTH;

  // handle curves in saved plays for midpoint
  // c2 === to on straight curves
  const isInitStraight =
    lastCurve?.c2.x === lastCurve?.to.x && lastCurve?.c2.y === lastCurve?.to.y;

  const initMidX =
    lastCurve && !isInitStraight
      ? (lastCurve.c2.x - initEndX) / (9 / 16) + initEndX //https://github.com/wcandillon/react-native-redash/blob/master/src/Paths.ts
      : (initPlayerX + initEndX) / 2;

  const initMidY =
    lastCurve && !isInitStraight
      ? (lastCurve.c2.y - initEndY) / (9 / 16) + initEndY
      : (initPlayerY + initEndY) / 2;

  return { initPlayerX, initPlayerY, initEndX, initEndY, initMidX, initMidY };
};

export const setPlayerArrowPositions = (playerPos, posMid, posEnd, path) => {
  const { initPlayerX, initPlayerY, initEndX, initEndY, initMidX, initMidY } =
    getInitialPositions(path);
  console.log('init x ', initPlayerX);
  playerPos.value = { x: initPlayerX, y: initPlayerY };
  posEnd.value = { x: initEndX, y: initEndY };
  posMid.value = { x: initMidX, y: initMidY };
};

// create the default "next path"
export const setNextPath = (playerPos, posMid, posEnd) => {
  const { x, y } = playerPos.value;

  const p = createPath({ x, y });
  addArc(p, { x, y: y - DEFAULT_LENGTH / 2 }, { x, y: y - DEFAULT_LENGTH });

  setPlayerArrowPositions(playerPos, posMid, posEnd, p);

  return p;
};
