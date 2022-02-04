import React from 'react';
import { Center, Text, useColorModeValue } from 'native-base';
import { Svg } from 'react-native-svg';
import drillCategoryMap from '../../static/drillCategoryMap';

const DrillDetailCategoryHeader = ({ category }) => {
  const textColor = useColorModeValue('violet.500', 'violet.400');

  return (
    <Center>
      <Svg height="300" width="300">
        {drillCategoryMap[category].image}
      </Svg>
      <Center position="absolute" bottom="0" left="0" px="3">
        <Text
          fontSize="md"
          color={textColor}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          {category}
        </Text>
      </Center>
    </Center>
  );
};

export default DrillDetailCategoryHeader;
