import React, { useContext } from 'react';
import { Context as DrillContext } from '../../context/DrillContext';
import VerticalScrollList from '../../components/VerticalScrollList';

const DrillListScreen = ({ navigation }) => {
  const { state, fetchDrills } = useContext(DrillContext);
  // TODO: fetch drills on render

  return (
    <VerticalScrollList
      data={state}
      onPress={(item) =>
        navigation.navigate('DrillDetail', {
          id: item.id,
          title: item.title,
        })
      }
    />
  );
};

export default DrillListScreen;
