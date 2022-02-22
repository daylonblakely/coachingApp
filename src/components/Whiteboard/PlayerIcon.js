import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet } from 'react-native';
import { Circle } from 'native-base';

const PlayerIcon = () => {
  const position = useRef(new Animated.ValueXY({ x: 100, y: 100 })).current;

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
      style={[{ ...position.getLayout() }, styles.container]}
      {...panResponder.panHandlers}
    >
      <Circle
        size="xs"
        //   bg={useColorModeValue('secondary.600', 'primary.600')}
        _text={{
          fontWeight: 'bold',
          fontSize: '3xl',
        }}
        bg="secondary.600"
      >
        1
      </Circle>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default PlayerIcon;
