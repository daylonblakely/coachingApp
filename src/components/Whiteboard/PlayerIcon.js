import React, { useState } from 'react';
import { Animated, StyleSheet, Button } from 'react-native';
import { Circle } from 'native-base';

const PlayerIcon = ({ position, panResponder }) => {
  const [isMovable, setIsMovable] = useState(true);
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 200, y: 200 },
      useNativeDriver: false,
    }).start();
  };
  return (
    <>
      <Button onPress={resetPosition} title="reset pos" />
      <Button onPress={() => setIsMovable(!isMovable)} title="toggle" />
      <Animated.View
        style={[{ ...position.getLayout() }, styles.container]}
        {...(isMovable && panResponder.panHandlers)}
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
