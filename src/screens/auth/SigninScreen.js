import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const SigninScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Signin screen</Text>
      <Button
        title="go to signup screen"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SigninScreen;
