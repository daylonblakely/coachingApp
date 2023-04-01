import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Circle, Text, useDisclose } from 'native-base';
import Animated from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import usePlayerPosition from '../../../hooks/usePlayerPosition';
import useArrowPoints from '../../../hooks/useArrowPoints';
import usePlayerAnimation from '../../../hooks/usePlayerAnimation';
import Arrow from './Arrow';
import MenuIcon from '../../MenuIcon';
import StaggerModal from '../../StaggerModal';
import { setNextPath } from '../../../utils/pathUtils';
import { Context as PlayContext } from '../../../context/PlayContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayerIcon = ({ playerId, arrowColor, label, animationProgress }) => {
  console.log('---------RENDERING PLAYER: ', label);
  const {
    state: { currentPlay, currentStep },
    updateCurrentPlayerPath,
    addArrow,
    addDribble,
    addScreen,
    removePlayer,
  } = useContext(PlayContext);

  const { pathToNextPos, pathType } =
    currentPlay.players.find((p) => playerId === p?.id).steps[currentStep] ||
    {};

  const { isOpen, onToggle } = useDisclose();

  const {
    // position shared values
    playerPos,
    posMid,
    posEnd,
    // gesture handlers
    gestureHandlerPlayer,
    gestureHandlerEnd,
    gestureHandlerMid,
    // animated styles/props
    animatedStylePlayer,
    animatedStyleMid,
    animatedStyleEnd,
  } = usePlayerPosition(playerId, pathToNextPos, pathType);

  const { animatedPropsArrow, animatedPropsArrowHead } = useArrowPoints(
    playerPos,
    posMid,
    posEnd,
    pathToNextPos,
    pathType
  );

  usePlayerAnimation(playerPos, pathToNextPos, animationProgress);

  const menuIcons = [
    {
      bg: 'yellow.400',
      icon: 'arrow-up',
      text: 'Add Arrow',
      onPress: () => addArrow(playerId, setNextPath(playerPos, posMid, posEnd)),
    },
    {
      bg: 'yellow.400',
      icon: 'basketball-sharp',
      text: 'Add Dribble',
      onPress: () =>
        addDribble(playerId, setNextPath(playerPos, posMid, posEnd)),
    },
    {
      bg: 'yellow.400',
      icon: 'md-pin-sharp',
      text: 'Add Screen',
      onPress: () =>
        addScreen(playerId, setNextPath(playerPos, posMid, posEnd)),
    },
    {
      bg: 'red.400',
      icon: 'arrow-undo',
      text: 'Remove Arrow',
      onPress: () => updateCurrentPlayerPath(playerId, null),
    },
    {
      bg: 'red.400',
      icon: 'remove-sharp',
      text: 'Remove Player',
      onPress: () => removePlayer(playerId),
    },
  ];

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .runOnJS(true)
    .onStart(onToggle);

  const composed = Gesture.Race(gestureHandlerPlayer, doubleTapGesture);

  return (
    <>
      <Arrow
        gestureHandlerEnd={gestureHandlerEnd}
        animatedStyleEnd={animatedStyleEnd}
        gestureHandlerMid={gestureHandlerMid}
        animatedStyleMid={animatedStyleMid}
        animatedPropsArrow={animatedPropsArrow}
        animatedPropsArrowHead={animatedPropsArrowHead}
        color={arrowColor}
      />

      <GestureDetector gesture={composed}>
        <AnimatedCircle
          style={animatedStylePlayer}
          position="absolute"
          size="xs"
          bg="secondary.600"
        >
          <Text color="white" fontSize="xl">
            {label}
          </Text>
        </AnimatedCircle>
      </GestureDetector>
      <StaggerModal isOpen={isOpen} onToggle={onToggle}>
        {menuIcons.map(({ bg, icon, text, onPress }, i) => (
          <MenuIcon bg={bg} icon={icon} text={text} onPress={onPress} key={i} />
        ))}
      </StaggerModal>
    </>
  );
};

PlayerIcon.propTypes = {
  playerId: PropTypes.number.isRequired,
  arrowColor: PropTypes.string,
  label: PropTypes.string,
  animationProgress: PropTypes.object,
};

export default PlayerIcon;
