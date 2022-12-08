import { useContext } from 'react';
import { Circle, Text, useDisclose } from 'native-base';
import Animated from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import usePlayerPosition from '../../hooks/usePlayerPosition';
import usePlayerAnimation from '../../hooks/usePlayerAnimation';
import Arrow from './Arrow';
import MenuIcon from '../MenuIcon';
import StaggerModal from '../StaggerModal';
import { setNextPath } from '../../utils/pathUtils';
import { Context as PlayContext } from '../../context/PlayContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayerIcon = ({ playerId, arrowColor, label, animationProgress }) => {
  console.log('---------RENDERING PLAYER: ', label);
  const {
    state: { currentPlay, runStep },
    updateCurrentPlayerPath,
  } = useContext(PlayContext);

  const { pathToNextPos } = currentPlay.players.find(
    ({ id }) => playerId === id
  ).steps[runStep];

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
    animatedPropsArrow,
    animatedPropsArrowHead,
  } = usePlayerPosition(playerId);

  usePlayerAnimation(playerPos, playerId, animationProgress);

  const menuIcons = [
    {
      bg: 'yellow.400',
      icon: 'add-sharp',
      text: 'Add Arrow',
      onPress: () =>
        updateCurrentPlayerPath(
          playerId,
          setNextPath(playerPos, posMid, posEnd)
        ),
    },
    { bg: 'yellow.400', icon: 'add-sharp', text: 'Add Dribble' },
    { bg: 'red.400', icon: 'arrow-undo', text: 'Reset' },
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
        // pass in isVisible to conditionally render arrow mid and end points
        // conditionally rendering the entire Arrow component caused a bug with the animated props of the SVG
        isVisible={!!pathToNextPos}
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

export default PlayerIcon;
