import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, FlatList } from 'native-base';
import { Context as DrillContext } from '../../context/DrillContext';
import VerticalScrollListItem from '../../components/VerticalScrollListItem';

const DrillListScreen = ({ navigation }) => {
  const { state, fetchDrills } = useContext(DrillContext);
  // TODO: fetch drills on render

  return (
    <Box>
      <FlatList
        data={state}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DrillDetail', {
                id: item.id,
                title: item.title,
              })
            }
          >
            <VerticalScrollListItem
              title={item.title}
              subtitle={item.category}
            />
          </TouchableOpacity>
        )}
      />
    </Box>
  );
};

export default DrillListScreen;
