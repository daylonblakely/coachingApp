import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Dimensions, View } from 'react-native';
import { Svg, Defs, Marker, Rect, Path } from 'react-native-svg';
import { Circle } from 'native-base';
import useAnimation from '../../hooks/useAnimation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = 680; // TODO get height

const VIEWBOX_WIDTH = Dimensions.get('window').width;
const VIEWBOX_HEIGHT = 680;

const LINE_OFFSET = 8; // .5 * width of circle + stroke width of path
const START_OFFSET = 20; // ~ .5 * width of player + stroke width

const positionToVal = (position) => parseFloat(JSON.stringify(position));

const Arrow = ({ positionStart }) => {
  const { x, y } = positionStart;
  const initialX = positionToVal(x);
  const initialY = positionToVal(y);

  const [positionEnd, panResponderEnd] = useAnimation(
    initialX + START_OFFSET - LINE_OFFSET,
    initialY - 80
  );

  // gets the midpoint between positionStart and positionEnd
  const getMidpoint = () => {
    return {
      x:
        (positionToVal(positionStart.x) + positionToVal(positionEnd.x)) / 2 +
        LINE_OFFSET,
      y:
        (positionToVal(positionStart.y) + positionToVal(positionEnd.y)) / 2 +
        LINE_OFFSET,
    };
  };

  const [positionMiddle, panResponderMiddle] = useAnimation(
    getMidpoint().x,
    getMidpoint().y
  );
  const [path, setPath] = useState('');
  const isCurved = useRef(false);

  // TODO - confirm these interpolates are necessary
  const interpolateX = (x) =>
    positionToVal(
      //use stringify because interpolate returns an obj
      x.interpolate({
        inputRange: [0, SCREEN_WIDTH],
        outputRange: [0, VIEWBOX_WIDTH],
      })
    );
  const interpolateY = (y) =>
    positionToVal(
      y.interpolate({
        inputRange: [0, SCREEN_HEIGHT],
        outputRange: [0, VIEWBOX_HEIGHT],
      })
    );

  // the start will be attatched to the player icon by default
  // set returns a straight line if isCurved == false
  const getPath = () => {
    const startX = interpolateX(positionStart.x) + START_OFFSET;
    const startY = interpolateY(positionStart.y) + START_OFFSET;

    const midX = interpolateX(positionMiddle.x) + LINE_OFFSET;
    const midY = interpolateY(positionMiddle.y) + LINE_OFFSET;

    const endX = interpolateX(positionEnd.x) + LINE_OFFSET; // .5 * width of circle + stroke width of path
    const endY = interpolateY(positionEnd.y) + LINE_OFFSET;

    const svgPath = isCurved.current
      ? `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`
      : `M ${startX} ${startY} L ${endX} ${endY}`;

    setPath(svgPath);
  };

  useEffect(() => {
    getPath();
  }, []);

  positionStart.addListener((value) => {
    if (value) {
      if (!isCurved.current) {
        positionMiddle.setValue(getMidpoint());
      }
      getPath();
    }
  });

  positionMiddle.addListener((value) => {
    if (value) {
      // set isCurved to true if the midpoint has been moved off the straight line
      // TODO - snap back to the midpoint when close enough
      if (value.x !== getMidpoint().x && value.y !== getMidpoint().y) {
        isCurved.current = true;
      }
      getPath();
    }
  });

  positionEnd.addListener((value) => {
    if (value) {
      if (!isCurved.current) {
        positionMiddle.setValue(getMidpoint());
      }
      getPath();
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
            markerWidth="6"
            markerHeight="4"
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
