import React from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { theme, colorModeManager } from './src/theme';
import { Provider as DrillProvider } from './src/context/DrillContext';
import RootComponent from './src/components/RootComponent';

export default () => {
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <DrillProvider>
        <StatusBar
          translucent
          backgroundColor="#5E8D48" //TODO - update color and style
          barStyle="light-content"
        />
        <RootComponent />
      </DrillProvider>
    </NativeBaseProvider>
  );
};
