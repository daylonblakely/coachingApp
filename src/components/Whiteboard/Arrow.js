import React from 'react';
import { StyleSheet } from 'react-native';
import { Svg, Defs, Marker, Path } from 'react-native-svg';
import { Circle } from 'native-base';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Arrow = ({
  gestureHandlerEnd,
  animatedStyleEnd,
  gestureHandlerMid,
  animatedStyleMid,
  animatedPropsArrow,
}) => {
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
