import React from 'react';
import { ScrollView } from 'native-base';
import HorizontalListDisplay from '../../components/HorizontalListDisplay';
import ListBoxOption from '../../components/ListBoxOption';
import drillCategoryMap from '../../static/drillCategoryMap';

const DrillHomeScreen = ({ navigation }) => {
  const categories = ['All Drills', ...Object.keys(drillCategoryMap)];
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
            onPress={() => navigation.navigate('DrillList', { title: item })}
          />
        )}
      />
    </ScrollView>
  );
};

export default DrillHomeScreen;
