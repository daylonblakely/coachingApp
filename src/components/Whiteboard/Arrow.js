import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Svg, Defs, Marker, Rect, Path } from 'react-native-svg';
import { Circle } from 'native-base';
import Animated, {
  useAnimatedReaction,
  useAnimatedProps,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { createPath, addArc, serialize } from 'react-native-redash';
import useDraggable from '../../hooks/useDraggable';
import { Context as PlayContext } from '../../context/PlayContext';

const SNAP_THRESHOLD = 100; // min distance from straight line for curve

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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

const Arrow = ({ playerPos, initPath }) => {
  const { state } = useContext(PlayContext);

  const initEndX =
    initPath?.curves[initPath.curves.length - 1].to.x || playerPos.value.x;

  const initEndY =
    initPath?.curves[initPath.curves.length - 1].to.y ||
    playerPos.value.y + 100;

  const [posEnd, gestureHandlerEnd, animatedStyleEnd] = useDraggable(
    {
      initX: initEndX,
      initY: initEndY,
    },
    state.isEditMode
  );

  // TODO set initial midpoint for existing path
  const [posMid, gestureHandlerMid, animatedStyleMid] = useDraggable(
    {
      initX: (playerPos.value.x + initEndX) / 2,
      initY: (playerPos.value.y + initEndY) / 2,
    },
    state.isEditMode,
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

  // moves midpoint when end or player are dragged
  useAnimatedReaction(
    () => {
      return [playerPos.value, posEnd.value];
    },
    (result) => {
      if (isStraight(result[0], result[1], posMid.value)) {
        posMid.value = {
          x: (result[0].x + result[1].x) / 2,
          y: (result[0].y + result[1].y) / 2,
        };
      }
    }
  );

  const animatedPropsArrow = useAnimatedProps(() => {
    const p = createPath(playerPos.value);
    addArc(p, posMid.value, posEnd.value);
    return { d: serialize(p) };
  });

  return (
    <>
      <Svg
        width="100%"
        height="100%"
        // viewBox="0 0 1 1"
        //   viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      >
        <Defs>
          <Marker
            id="Triangle"
            viewBox="0 0 10 10"
            refX="0"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="6"
            markerHeight="4"
            orient="auto"
          >
            <Path d="M 0 0 L 10 5 L 0 10 z" stroke="black" fill="black" />
          </Marker>
        </Defs>
        <AnimatedPath
          animatedProps={animatedPropsArrow}
          stroke="black"
          strokeWidth="6"
          markerEnd="url(#Triangle)"
        />
      </Svg>
      <PanGestureHandler onGestureEvent={gestureHandlerMid}>
        <AnimatedCircle
          style={[styles.container, animatedStyleMid]}
          size="10"
          bg="green.600"
        />
      </PanGestureHandler>
      <PanGestureHandler onGestureEvent={gestureHandlerEnd}>
        <AnimatedCircle
          style={[styles.container, animatedStyleEnd]}
          size="10"
          bg="primary.600"
        />
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default Arrow;
