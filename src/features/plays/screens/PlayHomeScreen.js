import React from 'react';
import { ScrollView, Text, Box } from 'native-base';
import HorizontalListDisplay from '../../../components/HorizontalListDisplay';
import ListBoxOption from '../../../components/ListBoxOption';

const PlayHomeScreen = ({ navigation }) => {
  const quickAccess = ['Recent'];

  return (
    <ScrollView>
      <Box pb="10">
        <Text>Search bar here</Text>
        <HorizontalListDisplay
          heading="Quick Access"
          text="Find your favorite or recently added plays"
          data={quickAccess}
          renderItem={({ item }) => (
            <ListBoxOption
              color="red.200"
              text={item}
              onPress={() => navigation.navigate('PlayList', { title: item })}
            />
          )}
        />
      </Box>
    </ScrollView>
  );
};

export default PlayHomeScreen;
