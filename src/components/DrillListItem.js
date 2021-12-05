import React from 'react';
import {
  Box,
  Stack,
  VStack,
  Spacer,
  Text,
  ChevronRightIcon,
  HStack,
} from 'native-base';

const DrillListItem = ({ drill }) => {
  const { title, category } = drill;
  return (
    <Box borderBottomWidth="1" rounded="lg" overflow="hidden">
      <Stack p="4" space={3}>
        <HStack alignItems="center">
          <VStack>
            <Text bold>{title}</Text>
            <Text fontSize="md">{category}</Text>
          </VStack>
          <Spacer />
          <ChevronRightIcon size="6" />
        </HStack>
      </Stack>

      {/* <Spacer /> */}
    </Box>
  );
};

export default DrillListItem;
