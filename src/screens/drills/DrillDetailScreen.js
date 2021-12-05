import React, { useContext } from 'react';
import { Box, Heading, Stack, Text } from 'native-base';
import { Context as DrillContext } from '../../context/DrillContext';

const DrillDetailScreen = ({ route, navigation }) => {
  const { state } = useContext(DrillContext);

  const { id } = route.params;
  const drill = state.find((d) => d.id === id);

  return (
    <Box
      // maxW="80%"
      rounded="sm"
      overflow="hidden"
      borderWidth="1"
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      marginTop="5px"
    >
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading>{drill.title}</Heading>
          <Text
            fontSize="md"
            _light={{
              color: 'violet.500',
            }}
            _dark={{
              color: 'violet.400',
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            {drill.category}
          </Text>
        </Stack>
        <Text>{drill.description}</Text>
        <Text>{drill.comments}</Text>
      </Stack>
    </Box>
  );
};

export default DrillDetailScreen;
