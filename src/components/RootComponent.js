import React from 'react';
import { useColorModeValue, useToken } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import NavigationFlow from './navigation';

const RootComponent = () => {
  const [lightBg, darkBg] = useToken(
    'colors',
    ['coolGray.50', 'blueGray.900'],
    'blueGray.900'
  );
  const bgColor = useColorModeValue(lightBg, darkBg);
  const headerColor = useColorModeValue('yellow', 'red');
  const textColor = useColorModeValue('black', 'white');
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: bgColor,
          card: headerColor,
          text: textColor,
        },
      }}
    >
      <NavigationFlow />
    </NavigationContainer>
  );
};

export default RootComponent;
