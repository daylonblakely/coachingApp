import React, { useContext } from 'react';
import { Box, Stack, Text, FlatList } from 'native-base';
import { Context as DrillContext } from '../../context/DrillContext';
import DrillCategorySVG from '../../components/drills/DrillCategorySVG';
import DrillDetailTitle from '../../components/drills/DrillDetailTitle';
import ItemTag from '../../components/ItemTag';

const DrillDetailScreen = ({ route, navigation }) => {
  const { state } = useContext(DrillContext);

  const { id } = route.params;
  const drill = state.find((d) => d.id === id);

  return (
    <>
      <DrillCategorySVG category={drill.category} />
      <Box>
        <Stack p="3" space={3}>
          <DrillDetailTitle
            title={drill.title}
            isIndividual={drill.isIndvidual}
          />
          <FlatList
            horizontal
            data={drill.tags}
            renderItem={({ item }) => <ItemTag text={item} />}
            keyExtractor={(x, i) => i.toString()}
            showsHorizontalScrollIndicator={false}
          />
          <Text>{drill.description}</Text>
          {/* TODO add drill comments */}
          {/* <Box variant="card">
            <Text>{drill.comments}</Text>
          </Box> */}
        </Stack>
      </Box>
    </>
  );
};

export default DrillDetailScreen;
