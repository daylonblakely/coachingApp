import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const PracticeListScreen = ({ navigation }) => {
  return (
    <View>
      <Text>PRactice list</Text>
      <Button
        title="go to practice create screen"
        onPress={() => navigation.navigate('PracticeCreate')}
      />
      <Button
        title="go to practice detail screen"
        onPress={() => navigation.navigate('PracticeDetail')}
      />
    </View>
  );
};
const styles = StyleSheet.create({});

export default PracticeListScreen;
