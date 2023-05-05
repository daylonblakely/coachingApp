import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Circle, Text, useDisclose } from 'native-base';
import Animated from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import usePlayerPosition from '../../hooks/usePlayerPosition';
import useArrowPoints from '../../hooks/useArrowPoints';
import usePlayerAnimation from '../../hooks/usePlayerAnimation';
import Arrow from './Arrow';
import MenuIcon from '../../../../components/MenuIcon';
import StaggerModal from '../../../../components/StaggerModal';
import { setNextPath } from '../../utils/pathUtils';
import { Context as PlayContext } from '../../PlayContext';
import { PLAYER_CIRCLE_SIZE } from '../../constants';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayerIcon = ({ playerId, arrowColor, label, animationProgress }) => {
  console.log('---------RENDERING PLAYER: ', label);
  const {
    state: { currentPlay, currentStep, isEditMode },
    updateCurrentPlayerPath,
    addArrow,
    addDribble,
    addScreen,
    removePlayer,
    addBall,
  } = useContext(PlayContext);

  // check if any players have the ball in the current step
  const stepHasBall = currentPlay.players.some(
    (p) => p?.steps[currentStep]?.hasBall === true
  );

  const { pathToNextPos, pathType, hasBall } =
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
    ...(!hasBall
      ? [
          {
            bg: 'yellow.400',
            icon: 'arrow-up',
            text: 'Add Arrow',
            onPress: () =>
              addArrow(playerId, setNextPath(playerPos, posMid, posEnd)),
          },
          {
            bg: 'yellow.400',
            icon: 'md-pin-sharp',
            text: 'Add Screen',
            onPress: () =>
              addScreen(playerId, setNextPath(playerPos, posMid, posEnd)),
          },
          ...(!stepHasBall
            ? [
                {
                  bg: 'blue.400',
                  icon: 'basketball-outline',
                  text: 'Add Ball',
                  onPress: () => addBall(playerId),
                },
              ]
            : []),
        ]
      : [
          {
            bg: 'yellow.400',
            icon: 'arrow-up',
            text: 'Add Dribble',
            onPress: () =>
              addDribble(playerId, setNextPath(playerPos, posMid, posEnd)),
          },
          {
            bg: 'blue.400',
            icon: 'basketball-outline',
            text: 'Pass Ball',
            onPress: () => {
              console.log('pass');
            },
          },
        ]),
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
        isEditMode={isEditMode}
      />
      <GestureDetector gesture={composed}>
        <AnimatedCircle
          style={animatedStylePlayer}
          position="absolute"
          size={PLAYER_CIRCLE_SIZE}
          borderWidth={hasBall ? '3' : '0'}
          _dark={{ borderColor: 'white', backgroundColor: 'primary.500' }}
          _light={{
            borderColor: 'black',
            backgroundColor: 'primary.600',
          }}
        >
          <Text
            fontSize={hasBall ? 'xl' : '2xl'}
            bold
            _dark={{ color: 'white' }}
            _light={{ color: 'black' }}
          >
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
