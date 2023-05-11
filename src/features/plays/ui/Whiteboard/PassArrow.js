/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Svg, Defs, Marker, Path } from 'react-native-svg';
import { Circle, Text } from 'native-base';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { serialize } from 'react-native-redash';
import { getPassArrowPath } from '../../utils/pathUtils';
import usePlayerAnimation from '../../hooks/usePlayerAnimation';

import { Context as PlayContext } from '../../PlayContext';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PassArrow = ({ animationProgress }) => {
  const {
    state: {
      passFromPosSharedVal,
      passToPosSharedVal,
      isEditMode,
      currentStep,
    },
  } = useContext(PlayContext);

  const ballPos = useSharedValue({ x: 0, y: 0 });
  const passRecipientPos = useSharedValue({ x: 0, y: 0 });

  useAnimatedReaction(
    () => [passFromPosSharedVal?.value, passToPosSharedVal?.value],
    ([res1, res2]) => {
      // dont update path if when player moves while not in edit mode (play animations)
      if (res1 && res2 && isEditMode) {
        ballPos.value = res1;
        passRecipientPos.value = res2;
      }
    },
    [passFromPosSharedVal, passToPosSharedVal, isEditMode]
  );

  useAnimatedReaction(
    () => {},
    () => {
      if (passFromPosSharedVal && passToPosSharedVal) {
        ballPos.value = passFromPosSharedVal?.value;
        passRecipientPos.value = passToPosSharedVal?.value;
      }
    },
    [passFromPosSharedVal, passToPosSharedVal, currentStep]
  );

  const animatedPropsArrow = useAnimatedProps(() => {
    // remove line when there isn't a pass
    if (!ballPos.value || !passRecipientPos.value || !passFromPosSharedVal)
      return { d: 'M 0 0 L 0 0' };

    const p = getPassArrowPath(ballPos.value, passRecipientPos.value);

    return { d: serialize(p) };
  });

  const animatedPropsArrowHead = useAnimatedProps(() => {
    return { d: passFromPosSharedVal ? 'M 0 0 L 10 5 L 0 10 z' : '' };
  });

  //   const animatedStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [
  //         { translateX: ballPos.value.x },
  //         { translateY: ballPos.value.y },
  //       ],
  //     };
  //   });

  //   usePlayerAnimation(
  //     ballPos,
  //     getPassArrowPath(
  //       passFromPosSharedVal?.value || { x: 0, y: 0 },
  //       passToPosSharedVal?.value || { x: 0, y: 0 }
  //     ),
  //     animationProgress
  //   );

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
      {/* <AnimatedCircle
        style={animatedStyle}
        position="absolute"
        size="sm"
        bg="red.300"
      >
        <Text
          fontSize={'xl'}
          bold
          _dark={{ color: 'white' }}
          _light={{ color: 'black' }}
        >
          {'B'}
        </Text>
      </AnimatedCircle> */}
    </>
  );
};

export default PassArrow;
