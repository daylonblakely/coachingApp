import React from 'react';
import { Center } from 'native-base';
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
    <Center bg="amber.500">
      <Svg height="300" width="300">
        {mapToImage(category)}
      </Svg>
    </Center>
  );
};

export default DrillCategorySVG;
