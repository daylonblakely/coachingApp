import React from 'react';
import { NativeBaseProvider, useColorModeValue, useToken } from 'native-base';
import { theme, colorModeManager } from './src/theme';
import { Provider as DrillProvider } from './src/context/DrillContext';
import RootComponent from './src/components/RootComponent';

export default () => {
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <DrillProvider>
        <RootComponent />
      </DrillProvider>
    </NativeBaseProvider>
  );
};
