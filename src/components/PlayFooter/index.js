import React, { useContext } from 'react';
import { Box, HStack, useDisclose } from 'native-base';
import FooterIcon from './FooterIcon';
import StaggerModal from '../StaggerModal';
import MenuIcon from '../MenuIcon';
import { Context as PlayContext } from '../../context/PlayContext';

const PlayFooter = () => {
  const {
    state: { runStep },
    runPlayAnimation,
    runStepAnimation,
    shouldAnimatePlay,
    shouldAnimateStep,
    setRunStep,
  } = useContext(PlayContext);

  const { isOpen, onToggle } = useDisclose();

  const footerIcons = [
    { icon: 'save', text: 'Save' },
    {
      icon: 'play-skip-back',
      text: 'Last Step',
      onPress: () => {
        if (runStep > 0 && !shouldAnimatePlay && !shouldAnimateStep)
          setRunStep(runStep - 1);
      },
    },
    { icon: 'play', text: 'Run Play', onPress: runPlayAnimation },
    { icon: 'play-skip-forward', text: 'Next Step', onPress: runStepAnimation },
  ];

  const menuIcons = [
    { bg: 'yellow.400', icon: 'add-sharp', text: 'Add Offense' },
    { bg: 'yellow.400', icon: 'add-sharp', text: 'Add Defense' },
    {
      bg: 'red.400',
      icon: 'arrow-undo',
      text: 'Reset',
      onPress: () => setRunStep(0),
    },
  ];

  //   putting a bg on the parent Box prevents clicks to Fab for some reason
  return (
    <Box>
      <HStack justifyContent="flex-start" variant="card" borderTopWidth="1">
        {footerIcons.map(({ icon, text, onPress }, i) => (
          <FooterIcon icon={icon} text={text} onPress={onPress} key={i} />
        ))}
      </HStack>
      <Box position="absolute" top="-50%" right="5">
        <MenuIcon
          bg="primary.700"
          icon="ellipsis-horizontal"
          onPress={onToggle}
        />
      </Box>
      <StaggerModal isOpen={isOpen} onToggle={onToggle}>
        {menuIcons.map(({ bg, icon, text, onPress }, i) => (
          <MenuIcon bg={bg} icon={icon} text={text} onPress={onPress} key={i} />
        ))}
      </StaggerModal>
    </Box>
  );
};

export default PlayFooter;
