import React from 'react';
import { Box, Text, useColorModeValue } from 'native-base';

const ItemTag = ({ text }) => {
  const color = useColorModeValue('violet.500', 'violet.400');
  return (
    <Box
      rounded="2xl"
      overflow="hidden"
      borderColor={color}
      borderWidth="1"
      mr="2"
      px="2"
    >
      <Text fontSize="lg" color={color} fontWeight="500">
        {text}
      </Text>
    </Box>
  );
};

export default ItemTag;
