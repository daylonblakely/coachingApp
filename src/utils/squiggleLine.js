import * as path from 'svg-path-properties';

// takes an svg path for a straight line and returns a path for a squiggly with the same endpoints
export default (
  followPathString,
  squiggleStep = 25,
  squiggleAmplitude = 30
) => {
  const followPath = path.svgPathProperties(followPathString);
  const pathLen = followPath.getTotalLength();

  // Adjust step so that there are a whole number of steps along the path
  const numSteps = Math.round(pathLen / squiggleStep);

  // begin squiggle at the same initial point as followPath
  let pos = followPath.getPointAtLength(0);
  let newPath = 'M' + [pos.x, pos.y].join(',');

  // add straight line to skip one squiggle
  pos = followPath.getPointAtLength(pathLen / numSteps);
  newPath += 'L' + [pos.x, pos.y].join(',');

  // side determines the side of the straight line to add a squiggle
  let side = -1;

  //  add squiggle for each step (except 1st and last)
  for (let i = 2; i <= numSteps - 1; i++) {
    const last = pos;
    pos = followPath.getPointAtLength((i * pathLen) / numSteps);

    // Find a point halfway between last and pos. Then find the point that is
    // perpendicular to that line segment, and is squiggleAmplitude away from
    // it on the side of the line designated by 'side' (-1 or +1).
    // This point will be the control point of the quadratic curve forming the
    // squiggle step.

    // The vector from the last point to this one
    const vector = { x: pos.x - last.x, y: pos.y - last.y };
    // The length of this vector
    const vectorLen = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    // The point halfwasy between last point and tis one
    const half = { x: last.x + vector.x / 2, y: last.y + vector.y / 2 };
    // The vector that is perpendicular to 'vector'
    const perpVector = {
      x: -((squiggleAmplitude * vector.y) / vectorLen),
      y: (squiggleAmplitude * vector.x) / vectorLen,
    };
    // No calculate the control point position
    const controlPoint = {
      x: half.x + perpVector.x * side,
      y: half.y + perpVector.y * side,
    };
    newPath += 'Q' + [controlPoint.x, controlPoint.y, pos.x, pos.y].join(',');
    // Switch the side (for next step)
    side = -side;
  }

  // finally, add a straight line from the last curve to the end of followPath
  pos = followPath.getPointAtLength(pathLen);
  newPath += 'L' + [pos.x, pos.y].join(',');

  return newPath;
};
