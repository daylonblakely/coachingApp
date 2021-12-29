import React from 'react';
import { Center, Text } from 'native-base';
import { Svg, Circle, Line } from 'react-native-svg';

const DrillCategorySVG = ({ category }) => {
  const mapToImage = (category) => {
    switch (category) {
      case 'Defense':
        return <Circle cx="150" cy="150" r="150" fill="pink" />;

      default:
        return <Circle cx="150" cy="150" r="150" fill="red" />;
    }
  };

  return (
    <Center>
      <Svg height="300" width="300">
        {mapToImage(category)}
      </Svg>
      <Center position="absolute" bottom="0" left="0" px="3">
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
          {category}
        </Text>
      </Center>
    </Center>
  );
};

export default DrillCategorySVG;
