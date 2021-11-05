import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';

const AuthNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        options={{ title: 'Sign In' }}
        component={SigninScreen}
      />
      <Stack.Screen
        name="Signup"
        options={{ title: 'Sign Up' }}
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
