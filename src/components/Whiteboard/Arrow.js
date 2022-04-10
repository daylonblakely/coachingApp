import React, { useState } from 'react';
import { Animated, StyleSheet, Dimensions, View } from 'react-native';
import { Svg, Defs, Marker, Rect, Path } from 'react-native-svg';
import { Circle } from 'native-base';
import useAnimation from '../../hooks/useAnimation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = 680; // TODO get height

const VIEWBOX_WIDTH = Dimensions.get('window').width;
const VIEWBOX_HEIGHT = 680;

const Arrow = () => {
  const [positionStart, panResponderStart] = useAnimation(200, 0);
  const [positionMiddle, panResponderMiddle] = useAnimation(30, 30);
  const [positionEnd, panResponderEnd] = useAnimation(60, 60);

  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    console.log('h', height);
    console.log('w', width);
  };

  const interpolateX = (x) =>
    JSON.stringify(
      //use stringify because interpolate returns an obj
      x.interpolate({
        inputRange: [0, SCREEN_WIDTH],
        outputRange: [0, VIEWBOX_WIDTH],
      })
    );
  const interpolateY = (y) =>
    JSON.stringify(
      y.interpolate({
        inputRange: [0, SCREEN_HEIGHT],
        outputRange: [0, VIEWBOX_HEIGHT],
      })
    );

  const getPath = () => {
    const startX = interpolateX(positionStart.x);
    const startY = interpolateY(positionStart.y);

    const midX = interpolateX(positionMiddle.x);
    const midY = interpolateY(positionMiddle.y);

    const endX = interpolateX(positionEnd.x);
    const endY = interpolateY(positionEnd.y);

    return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
  };

  const [path, setPath] = useState(getPath());

  positionStart.addListener((value) => {
    if (value) {
      setPath(getPath());
    }
  });

  positionMiddle.addListener((value) => {
    if (value) {
      setPath(getPath());
    }
  });

  positionEnd.addListener((value) => {
    if (value) {
      setPath(getPath());
    }
  });

  return (
    <>
      {/* <View style={{ backgroundColor: 'grey' }} onLayout={onLayout}> */}
      <Svg
        width="100%"
        height="100%"
        //   viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      >
        <Defs>
          <Marker
            id="Triangle"
            viewBox="0 0 10 10"
            refX="0"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="3"
            markerHeight="2"
            orient="auto"
          >
            <Path d="M 0 0 L 10 5 L 0 10 z" stroke="black" fill="black" />
          </Marker>
        </Defs>
        <Path
          d={path}
          fill="none"
          stroke="black"
          strokeWidth="6"
          markerEnd="url(#Triangle)"
        />
      </Svg>
      {/* </View> */}

      <Animated.View
        style={[{ ...positionStart.getLayout() }, styles.container]}
        {...panResponderStart.panHandlers}
      >
        <Circle
          size="4"
          //   bg={useColorModeValue('secondary.600', 'primary.600')}
          bg="secondary.600"
        ></Circle>
      </Animated.View>
      <Animated.View
        style={[{ ...positionMiddle.getLayout() }, styles.container]}
        {...panResponderMiddle.panHandlers}
      >
        <Circle
          size="4"
          //   bg={useColorModeValue('secondary.600', 'primary.600')}
          bg="black"
        ></Circle>
      </Animated.View>
      <Animated.View
        style={[{ ...positionEnd.getLayout() }, styles.container]}
        {...panResponderEnd.panHandlers}
      >
        <Circle
          size="4"
          //   bg={useColorModeValue('secondary.600', 'primary.600')}
          bg="primary.600"
        ></Circle>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default Arrow;
