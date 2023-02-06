import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, FlatList } from 'native-base';
import { Context as PlayContext } from '../../context/PlayContext';
import DrillListItem from '../../components/drills/DrillListItem';

const PlaylListScreen = ({ navigation }) => {
  const {
    state: { plays },
  } = useContext(PlayContext);
  // TODO: fetch play ids on render

  return (
    <Box>
      <FlatList
        data={plays}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PlayCreate', {
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

export default PlaylListScreen;
