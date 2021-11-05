import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import displayParentHeader from './src/navigation/displayParentHeader';
import CustomDrawerContent from './src/components/CustomDrawerContent';

import { Provider as DrillProvider } from './src/context/DrillContext';

import AuthNavigator from './src/navigation/AuthNavigator';
import PracticeNavigator from './src/navigation/practices';
import DrillNavigator from './src/navigation/DrillNavigator';
import HomeScreen from './src/screens/HomeScreen';

function mainFlow() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
  );
}

function renderScreens() {
  const isSignedIn = true; //TODO: use a user token in state
  return isSignedIn ? mainFlow() : AuthNavigator();
}

function App() {
  return <NavigationContainer>{renderScreens()}</NavigationContainer>;
}

export default () => {
  return (
    <DrillProvider>
      <App />
    </DrillProvider>
  );
};
