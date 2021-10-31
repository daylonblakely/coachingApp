import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const PracticeCreateScreen = ({ navigation }) => {
  return (
    <View>
      <Text>PRactice create</Text>
      <Button
        title="go back to practice list screen"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};
const styles = StyleSheet.create({});

export default PracticeCreateScreen;
