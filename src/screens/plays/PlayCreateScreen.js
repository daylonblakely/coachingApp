import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Whiteboard from '../../components/whiteboard';

const PlayCreateScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Play create</Text>
      <Whiteboard />
    </View>
  );
};
const styles = StyleSheet.create({});

export default PlayCreateScreen;
