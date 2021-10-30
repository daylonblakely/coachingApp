import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import displayParentHeader from './src/navigation/displayParentHeader';
import CustomDrawerContent from './src/components/CustomDrawerContent';

import AuthFlow from './src/screens/auth';
import DrillFlow from './src/screens/drills';
import HomeScreen from './src/screens/HomeScreen';

function mainFlow() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="Drills"
        component={DrillFlow}
        options={({ route }) => ({
          headerShown: displayParentHeader(route),
        })}
      />
    </Drawer.Navigator>
  );
}

function renderScreens() {
  const isSignedIn = true;
  return isSignedIn ? mainFlow() : AuthFlow();
}

function App() {
  return <NavigationContainer>{renderScreens()}</NavigationContainer>;
}

export default App;
