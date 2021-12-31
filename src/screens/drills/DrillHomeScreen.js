import React from 'react';
import { Box, Divider, Heading, ScrollView, Text, FlatList } from 'native-base';
import HorizontalListDisplay from '../../components/HorizontalListDisplay';
import ListBoxOption from '../../components/ListBoxOption';

const DrillHomeScreen = ({ navigation }) => {
  const categories = ['All Drills', 'Offense', 'Defense'];
  return (
    <ScrollView>
      <HorizontalListDisplay
        heading="Category"
        text="Find any drill by its assigned category"
        data={categories}
        renderItem={({ item }) => (
          <ListBoxOption
            color="red.500"
            text={item}
            onPress={() => navigation.navigate('DrillList', { _id: item._id })}
          />
        )}
      />
    </ScrollView>
  );
};

export default DrillHomeScreen;
