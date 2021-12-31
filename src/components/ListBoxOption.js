import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from 'native-base';

const ListBoxOption = ({ color, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box bg={color} height={200} width={200} mx="3">
        <Text>{text}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default ListBoxOption;
