import React from 'react';
import { Box } from 'native-base';
import { StyleSheet } from 'react-native';
import Whiteboard from '../../components/Whiteboard';
import PlayFooter from '../../components/PlayFooter';

const PlayCreateScreen = ({ navigation }) => {
  return (
    <Box flex={1}>
      <Whiteboard playId="1" />
      <PlayFooter />
    </Box>
  );
};
const styles = StyleSheet.create({});

export default PlayCreateScreen;
