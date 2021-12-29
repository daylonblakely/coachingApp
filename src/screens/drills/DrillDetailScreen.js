import React, { useContext } from 'react';
import { Box, Stack, Text } from 'native-base';
import { Context as DrillContext } from '../../context/DrillContext';
import DrillCategorySVG from '../../components/drills/DrillCategorySVG';
import DrillDetailTitle from '../../components/drills/DrillDetailTitle';

const DrillDetailScreen = ({ route, navigation }) => {
  const { state } = useContext(DrillContext);

  const { id } = route.params;
  const drill = state.find((d) => d.id === id);

  return (
    <>
      <DrillCategorySVG category={drill.category} />
      <Box
        // maxW="80%"
        rounded="sm"
        overflow="hidden"
        // borderWidth="1"
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        // marginTop="5px"
      >
        <Stack p="3" space={3}>
          <DrillDetailTitle title={drill.title} />
          <Text>{drill.description}</Text>
          <Text>{drill.comments}</Text>
        </Stack>
      </Box>
    </>
  );
};

export default DrillDetailScreen;
