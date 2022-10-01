import React from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { theme, colorModeManager } from './src/theme';
import { Provider as DrillProvider } from './src/context/DrillContext';
import { Provider as PlayProvider } from './src/context/PlayContext';
import { Provider as PlayerProvider } from './src/context/PlayerContext';
import RootComponent from './src/components/RootComponent';

export default () => {
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <PlayerProvider>
        <PlayProvider>
          <DrillProvider>
            <StatusBar
              translucent
              backgroundColor="#17171780" // muted.900
              barStyle="light-content"
            />
            <RootComponent />
          </DrillProvider>
        </PlayProvider>
      </PlayerProvider>
    </NativeBaseProvider>
  );
};
