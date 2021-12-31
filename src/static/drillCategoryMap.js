import React from 'react';
import { Svg, Circle, Line } from 'react-native-svg';

export default {
  Offense: {
    image: <Circle cx="150" cy="150" r="150" fill="pink" />,
  },
  Defense: {
    image: <Circle cx="150" cy="150" r="150" fill="red" />,
  },
  Rebounding: {
    image: <Circle cx="150" cy="150" r="150" fill="blue" />,
  },
  Transition: {
    image: <Circle cx="150" cy="150" r="150" fill="green" />,
  },
  Passing: {
    image: <Circle cx="150" cy="150" r="150" fill="yellow" />,
  },
  'Ball Handling': {
    image: <Circle cx="150" cy="150" r="150" fill="brown" />,
  },
  Shooting: {
    image: <Circle cx="150" cy="150" r="150" fill="grey" />,
  },
  Other: {
    image: <Circle cx="150" cy="150" r="150" fill="black" />,
  },
};
