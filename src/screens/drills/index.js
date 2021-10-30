import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrillListScreen from './DrillListScreen';
import DrillCreateScreen from './DrillCreateScreen';

const index = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="DrillList"
          options={{ title: 'Drills' }}
          component={DrillListScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="DrillCreate"
          component={DrillCreateScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default index;
