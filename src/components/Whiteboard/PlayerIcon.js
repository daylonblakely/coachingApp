import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';
import { Circle } from 'native-base';

const PlayerIcon = () => {
  const position = useRef(new Animated.ValueXY()).current;

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
  return (
    <Animated.View
      style={{ ...position.getLayout() }}
      {...panResponder.panHandlers}
    >
      <Circle
        size="md"
        //   bg={useColorModeValue('secondary.600', 'primary.600')}
        _text={{
          fontWeight: 'bold',
          fontSize: '5xl',
        }}
        bg="secondary.600"
        // marginLeft="40px"
      >
        1
      </Circle>
    </Animated.View>
  );
};

export default PlayerIcon;
