import React from 'react';
import { Box, Divider, Heading, Text, FlatList } from 'native-base';

const HorizontalListDisplay = ({ heading, text, data, renderItem }) => {
  return (
    <Box mx="3" my="5">
      <Heading fontSize="3xl">{heading}</Heading>
      <Divider my="1" thickness="2" />
      <Text>{text}</Text>
      <FlatList
        horizontal
        mt="3"
        data={data}
        renderItem={renderItem}
        keyExtractor={(x, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};

export default HorizontalListDisplay;
