import React from 'react';
import { ScrollView, Text } from 'native-base';
import HorizontalListDisplay from '../../components/HorizontalListDisplay';
import ListBoxOption from '../../components/ListBoxOption';
import drillCategoryMap from '../../static/drillCategoryMap';

const DrillHomeScreen = ({ navigation }) => {
  const categories = [...Object.keys(drillCategoryMap)];
  return (
    <ScrollView>
      <Text>Search bar here</Text>
      <HorizontalListDisplay
        heading="Category"
        text="Find drills by the assigned category"
        data={categories}
        renderItem={({ item }) => (
          <ListBoxOption
            color="red.200"
            text={item}
            onPress={() => navigation.navigate('DrillList', { title: item })}
          />
        )}
      />
    </ScrollView>
  );
};

export default DrillHomeScreen;
