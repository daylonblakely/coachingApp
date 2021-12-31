import React from 'react';
import { Box, Divider, Heading, Text, FlatList } from 'native-base';

const HorizontalListDisplay = ({ heading, text, data, renderItem }) => {
  return (
    <>
      <Box mx="3" my="5">
        <Heading fontSize="3xl" _light={{ color: 'primary.700' }}>
          {heading}
        </Heading>
        <Divider my="1" thickness="2" _light={{ bg: 'primary.700' }} />
        <Text _light={{ color: 'primary.700' }}>{text}</Text>
      </Box>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(x, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default HorizontalListDisplay;
