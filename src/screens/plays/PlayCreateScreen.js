import React, { useContext, useCallback } from 'react';
import { Box } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Whiteboard from '../../components/Whiteboard';
import PlayFooter from '../../components/PlayFooter';
import { Context as PlayContext } from '../../context/PlayContext';

const PlayCreateScreen = ({ navigation }) => {
  const { fetchPlayById } = useContext(PlayContext);

  const playId = '1';

  useFocusEffect(
    useCallback(() => {
      fetchPlayById(playId);
    }, [playId])
  );

  return (
    <Box flex={1}>
      <Whiteboard />
      <PlayFooter />
    </Box>
  );
};

export default PlayCreateScreen;
