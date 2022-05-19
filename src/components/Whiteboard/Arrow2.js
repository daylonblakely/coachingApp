import React, { useState, useEffect, useRef } from 'react';
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

const { Value, interpolate } = Animated;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Arrow2 = () => {
  const pos = useSharedValue({ x: 50, y: 100 });
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = pos.value.x;
      ctx.startY = pos.value.y;
    },
    onActive: (event, ctx) => {
      pos.value = {
        ...pos.value,
        x: ctx.startX + event.translationX,
        y: ctx.startY + event.translationY,
      };
    },
    onEnd: (_) => {
      //   pos.value = { x: 50, y: 100 };
      console.log('end drag');
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: pos.value.x }, { translateY: pos.value.y }],
    };
  });

  const animatedProps = useAnimatedProps(() => {
    //   TODO add curve functionality
    const path = createPath({ x: 20, y: 20 });
    addLine(path, pos.value);

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
          //   d={d}
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
