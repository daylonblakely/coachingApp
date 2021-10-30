import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const DrillListScreen = ({ navigation }) => {
  return (
    <View>
      <Text>DrillListScreen</Text>
      <Button
        title="go to drill create screen"
        onPress={() => navigation.navigate('DrillCreate')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DrillListScreen;
