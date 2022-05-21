import React, { useContext } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Svg, Defs, Marker, Rect, Path } from 'react-native-svg';
import { Circle } from 'native-base';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedProps,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {
  createPath,
  addArc,
  addLine,
  getYForX,
  serialize,
  interpolatePath,
} from 'react-native-redash';
import useDraggable from '../../hooks/useDraggable';
import { Context as PlayContext } from '../../context/PlayContext';

const { Value, interpolate } = Animated;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Arrow2 = ({ playerPos }) => {
  const { state } = useContext(PlayContext);
  const [posEnd, gestureHandler, animatedStyle] = useDraggable(
    {
      initX: 50,
      initY: 50,
    },
    state.isEditMode
  );

  const animatedProps = useAnimatedProps(() => {
    //   TODO add curve functionality
    const path = createPath(playerPos.value);
    addLine(path, posEnd.value);

    return { d: serialize(path) };
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
          animatedProps={animatedProps}
          //   style={[animatedStylePath]}
          //   d="M20,20 C70,20 50,10 100,100"
          //   d="M20,20 C36.875,25.625 71.875,60.625 100,100"
          //   fill="black"
          stroke="black"
          strokeWidth="6"
          markerEnd="url(#Triangle)"
        />
      </Svg>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <AnimatedCircle
          style={[styles.container, animatedStyle]}
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

export default Arrow2;
