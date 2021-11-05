import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PracticeListScreen from '../screens/PracticeListScreen';
import PracticeCreateScreen from '../screens/PracticeCreateScreen';
import PracticeDetailScreen from '../screens/PracticeDetailScreen';

const PracticeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="PracticeList"
          options={{ title: 'Practices', headerShown: false }}
          component={PracticeListScreen}
        />
        <Stack.Screen
          name="PracticeDetail"
          options={{ title: 'Practices' }}
          component={PracticeDetailScreen}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="PracticeCreate"
          component={PracticeCreateScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default PracticeNavigator;
