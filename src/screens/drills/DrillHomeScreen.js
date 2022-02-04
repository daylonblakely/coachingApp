import React from 'react';
import { ScrollView, Text, Box } from 'native-base';
import HorizontalListDisplay from '../../components/HorizontalListDisplay';
import ListBoxOption from '../../components/ListBoxOption';
import drillCategoryMap from '../../static/drillCategoryMap';

const DrillHomeScreen = ({ navigation }) => {
  const quickAccess = [
    'All Drills',
    'Most Used',
    'Recently Added',
    'Last Practice',
  ];
  const categories = [...Object.keys(drillCategoryMap)];
  const participants = ['Individual', 'Team'];

  return (
    <ScrollView>
      <Box pb="10">
        <Text>Search bar here</Text>
        <HorizontalListDisplay
          heading="Quick Access"
          text="Find your favorite or recently added drills"
          data={quickAccess}
          renderItem={({ item }) => (
            <ListBoxOption
              color="red.200"
              text={item}
              onPress={() => navigation.navigate('DrillList', { title: item })}
            />
          )}
        />
        <HorizontalListDisplay
          heading="Category"
          text="Offense, defense, shooting, etc. - find drills by primary focus"
          data={categories}
          renderItem={({ item }) => (
            <ListBoxOption
              color="red.200"
              text={item}
              onPress={() => navigation.navigate('DrillList', { title: item })}
            />
          )}
        />
        <HorizontalListDisplay
          heading="Participants"
          text="Find individual or team drills"
          data={participants}
          renderItem={({ item }) => (
            <ListBoxOption
              color="red.200"
              text={item}
              onPress={() => navigation.navigate('DrillList', { title: item })}
            />
          )}
        />
      </Box>
    </ScrollView>
  );
};

export default DrillHomeScreen;
