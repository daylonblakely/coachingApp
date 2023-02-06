import React, { useContext, useCallback } from 'react';
import { Box } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Whiteboard from '../../components/Whiteboard';
import PlayFooter from '../../components/PlayFooter';
import { Context as PlayContext } from '../../context/PlayContext';

const PlayCreateScreen = ({ route }) => {
  const { fetchPlayById } = useContext(PlayContext);

  const { id: playId } = route.params;

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
