import React from 'react';
import { Box } from 'native-base';
import { StyleSheet } from 'react-native';
import Whiteboard from '../../components/Whiteboard';
import PlayMenu from '../../components/PlayMenu';

const PlayCreateScreen = ({ navigation }) => {
  return (
    <Box h="100%">
      <Whiteboard playId="1" />
      <PlayMenu />
    </Box>
  );
};
const styles = StyleSheet.create({});

export default PlayCreateScreen;
