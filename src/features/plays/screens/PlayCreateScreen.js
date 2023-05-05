import React, { useContext, useCallback, useEffect } from 'react';
import { Box } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import Whiteboard from '../ui/Whiteboard';
import PlayFooter from '../ui/PlayFooter';
import { Context as PlayContext } from '../PlayContext';

const PlayCreateScreen = ({ route }) => {
  const { fetchPlayById, clearCurrentPlay } = useContext(PlayContext);

  const { id: playId } = route.params;

  useFocusEffect(
    useCallback(() => {
      fetchPlayById(playId);
    }, [playId])
  );

  useEffect(() => {
    return () => {
      console.log('cleanup whiteboard');
      clearCurrentPlay();
    };
  }, []);

  return (
    <Box flex={1}>
      <Whiteboard />
      <PlayFooter />
    </Box>
  );
};

export default PlayCreateScreen;
