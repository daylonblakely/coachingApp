import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const DrillCreateScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>DrillCreateScreen</Text>
      <Button
        title="go back to drill list screen"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
});

export default DrillCreateScreen;
