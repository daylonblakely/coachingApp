/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Svg, Defs, Marker, Path } from 'react-native-svg';
import { Circle } from 'native-base';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { serialize } from 'react-native-redash';
import { getPassArrowPath } from '../../utils/pathUtils';

import { Context as PlayContext } from '../../PlayContext';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PassArrow = () => {
  const {
    state: { passFromPosSharedVal, passToPosSharedVal },
  } = useContext(PlayContext);

  const animatedPropsArrow = useAnimatedProps(() => {
    if (!passFromPosSharedVal) return { d: '' };

    const p = getPassArrowPath(
      passFromPosSharedVal.value,
      passToPosSharedVal.value
    );

    return { d: serialize(p) };
  });

  const animatedPropsArrowHead = useAnimatedProps(() => {
    return { d: passFromPosSharedVal ? 'M 0 0 L 10 5 L 0 10 z' : '' };
  });

  return (
    <>
      <Svg width="100%" height="100%">
        <Defs>
          <Marker
            id="Triangle"
            viewBox="0 0 10 10"
            refX="0"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="5"
            markerHeight="3"
            orient="auto"
          >
            <AnimatedPath
              animatedProps={animatedPropsArrowHead}
              stroke={'black'}
              fill={'black'}
              strokeWidth="4"
            />
          </Marker>
        </Defs>
        <AnimatedPath
          animatedProps={animatedPropsArrow}
          stroke={'black'}
          strokeDasharray={'10,10'}
          strokeWidth="4"
          markerEnd="url(#Triangle)"
        />
      </Svg>
      {/* <AnimatedCircle></AnimatedCircle> */}
    </>
  );
};

export default PassArrow;
