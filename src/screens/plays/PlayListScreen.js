import React, { useContext } from 'react';
import { Context as PlayContext } from '../../context/PlayContext';
import VerticalScrollList from '../../components/VerticalScrollList';

const PlaylListScreen = ({ navigation }) => {
  const {
    state: { plays },
  } = useContext(PlayContext);
  // TODO: fetch play ids on render

  return (
    <VerticalScrollList
      data={plays}
      onPress={(item) =>
        navigation.navigate('PlayCreate', {
          id: item.id,
          title: item.title,
        })
      }
    />
  );
};

export default PlaylListScreen;
