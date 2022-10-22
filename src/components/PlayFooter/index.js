import React from 'react';
import { Box, HStack, useDisclose, Stagger, Modal } from 'native-base';
import FooterIcon from './FooterIcon';
import MenuIcon from './MenuIcon';

const PlayFooter = () => {
  const { isOpen, onToggle } = useDisclose();

  const footerIcons = [
    { icon: 'save', text: 'Save' },
    { icon: 'play-skip-back', text: 'Last Step' },
    { icon: 'play', text: 'Run Play' },
    { icon: 'play-skip-forward', text: 'Next Step' },
  ];

  const menuIcons = [
    { bg: 'yellow.400', icon: 'add-sharp', text: 'Add Offense' },
    { bg: 'yellow.400', icon: 'add-sharp', text: 'Add Defense' },
    { bg: 'red.400', icon: 'arrow-undo', text: 'Reset' },
  ];

  //   putting a bg on the parent Box prevents clicks to Fab for some reason
  return (
    <Box>
      <HStack justifyContent="flex-start" space={2} bg="red.600">
        {footerIcons.map(({ icon, text, onPress }, i) => (
          <FooterIcon icon={icon} text={text} onPress={onPress} key={i} />
        ))}
      </HStack>
      <Box position="absolute" top="-50%" right="5">
        <MenuIcon bg="cyan.600" icon="ellipsis-horizontal" onPress={onToggle} />
      </Box>
      <Modal isOpen={isOpen} onClose={onToggle}>
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 1,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
        >
          {menuIcons.map(({ bg, icon, text, onPress }, i) => (
            <MenuIcon
              bg={bg}
              icon={icon}
              text={text}
              onPress={onPress}
              key={i}
            />
          ))}
        </Stagger>
      </Modal>
    </Box>
  );
};

export default PlayFooter;
