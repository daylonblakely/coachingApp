import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, FlatList } from 'native-base';
import { Context as DrillContext } from '../../context/DrillContext';
import DrillListItem from '../../components/drills/DrillListItem';

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
            <DrillListItem drill={item} />
          </TouchableOpacity>
        )}
      />
    </Box>
  );
};

export default DrillListScreen;
