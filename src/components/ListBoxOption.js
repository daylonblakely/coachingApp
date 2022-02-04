import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text, Center } from 'native-base';

const ListBoxOption = ({ color, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box bg={color} height={200} width={200} mx="3">
        <Center position="absolute" bottom="0" left="0" px="3" my="3">
          <Text
            fontSize="2xl"
            // color={textColor}
            fontWeight="semibold"
          >
            {text}
          </Text>
        </Center>
      </Box>
    </TouchableOpacity>
  );
};

export default ListBoxOption;
