/* eslint-disable react/prop-types */
import React from 'react';
import { Svg, Defs, Marker, Path } from 'react-native-svg';
import { Circle } from 'native-base';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { ARROW_POINT_SIZE } from '../../constants';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Arrow = ({
  gestureHandlerEnd,
  animatedStyleEnd,
  gestureHandlerMid,
  animatedStyleMid,
  animatedPropsArrow,
  animatedPropsArrowHead,
  color,
  isEditMode,
}) => {
  return (
    <>
      <Svg width="100%" height="100%">
        <Defs>
          <Marker
            id="Triangle"
            viewBox="0 0 10 10"
            refX="0"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="5"
            markerHeight="3"
            orient="auto"
          >
            <AnimatedPath
              animatedProps={animatedPropsArrowHead}
              stroke={color || 'black'}
              fill={color || 'black'}
              strokeWidth="4"
            />
          </Marker>
        </Defs>
        <AnimatedPath
          animatedProps={animatedPropsArrow}
          stroke={color || 'black'}
          strokeWidth="4"
          markerEnd="url(#Triangle)"
        />
      </Svg>
      <>
        <GestureDetector gesture={gestureHandlerMid}>
          <AnimatedCircle
            style={animatedStyleMid}
            position="absolute"
            size={isEditMode ? ARROW_POINT_SIZE : 0}
            bg={color || 'black'}
          />
        </GestureDetector>
        <GestureDetector gesture={gestureHandlerEnd}>
          <AnimatedCircle
            style={animatedStyleEnd}
            position="absolute"
            size={isEditMode ? ARROW_POINT_SIZE : 0}
            bg={color || 'black'}
          />
        </GestureDetector>
      </>
    </>
  );
};

export default Arrow;
