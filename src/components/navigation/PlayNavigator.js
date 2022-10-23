import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PlayCreateScreen from '../../screens/plays/PlayCreateScreen';

const PlayNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
      }}
    >
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="PlayCreate"
          options={{ headerShown: false }}
          component={PlayCreateScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default PlayNavigator;
