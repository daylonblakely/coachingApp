import React from 'react';
import { View, StyleSheet } from 'react-native';
import Whiteboard from '../../components/Whiteboard';

const PlayCreateScreen = ({ navigation }) => {
  return (
    <View>
      <Whiteboard playId="1" />
    </View>
  );
};
const styles = StyleSheet.create({});

export default PlayCreateScreen;
