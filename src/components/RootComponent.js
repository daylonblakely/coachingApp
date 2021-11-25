import React from 'react';
import { useColorModeValue, useToken } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import NavigationFlow from './navigation';

const RootComponent = () => {
  const [lightBg, darkBg, lightPrimary, darkPrimary, darkModeHeader] = useToken(
    'colors',
    [
      'background.light',
      'background.dark',
      'primary.700',
      'primary.200',
      'darkModeHeader',
    ],
    'background.dark'
  );

  const bgColor = useColorModeValue(lightBg, darkBg);
  const headerColor = useColorModeValue(lightPrimary, darkModeHeader);
  const primaryColor = useColorModeValue('red', darkPrimary); //TODO: fix light primary
  const textColor = useColorModeValue('black', 'white'); //TODO: update these
  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: primaryColor,
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
