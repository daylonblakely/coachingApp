import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

export default (initialX, initialY) => {
  const position = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY })
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
      },
      onPanResponderMove: (event, { dx, dy }) => {
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (event, { dx }) => {
        position.flattenOffset(); //set and flatten offset handles position resetting
      },
    })
  ).current;

  // const resetPosition = () => {
  //   Animated.spring(position, {
  //     toValue: { x: 100, y: 100 },
  //     useNativeDriver: false,
  //   }).start();
  // };
  return [position, panResponder];
};
