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
      <Button
        title="go to drill detail screen"
        onPress={() => navigation.navigate('DrillDetail')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DrillListScreen;
