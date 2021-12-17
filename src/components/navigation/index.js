import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useColorModeValue, useToken } from 'native-base';
import AuthNavigator from './AuthNavigator';
import PracticeNavigator from './PracticeNavigator';
import DrillNavigator from './DrillNavigator';
import displayParentHeader from './displayParentHeader';

import HomeScreen from '../../screens/HomeScreen';
import CustomDrawerContent from './CustomDrawerContent';

export default () => {
  const Drawer = createDrawerNavigator();
  const [lightBg, darkBg] = useToken(
    'colors',
    ['drawer.light', 'drawer.dark'],
    'background.dark'
  );

  const isSignedIn = true; //TODO: use a user token in state
  return isSignedIn ? (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: useColorModeValue(lightBg, darkBg),
          // width: 240,
        },
        headerStyle: {
          // height: 200, // Specify the height of your custom header
        },
        headerTintColor: 'white',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="Practice Plans"
        component={PracticeNavigator}
        options={({ route }) => ({
          headerShown: displayParentHeader(route),
        })}
      />
      <Drawer.Screen
        name="Drills"
        component={DrillNavigator}
        options={({ route }) => ({
          headerShown: displayParentHeader(route),
        })}
      />
    </Drawer.Navigator>
  ) : (
    <AuthNavigator />
  );
};
