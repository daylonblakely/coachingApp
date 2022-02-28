import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, Button } from 'react-native';
import useAnimation from '../../hooks/useAnimation';
import { Circle } from 'native-base';

const PlayerIcon = () => {
  const [position, panResponder] = useAnimation(200, 200);
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 200, y: 200 },
      useNativeDriver: false,
    }).start();
  };
  return (
    <>
      <Button onPress={resetPosition} title="fawklj" />
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
          2
        </Circle>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default PlayerIcon;
