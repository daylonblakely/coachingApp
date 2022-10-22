import React from 'react';
import { Box, HStack, useDisclose, Stagger, Modal } from 'native-base';
import FooterIcon from './FooterIcon';
import MenuIcon from './MenuIcon';

const PlayFooter = () => {
  const { isOpen, onToggle } = useDisclose();

  //   putting a bg on the parent Box prevents clicks to Fab for some reason
  return (
    <Box>
      <HStack justifyContent="flex-start" space={2} bg="red.600">
        <FooterIcon icon="save" text="Save" />
        <FooterIcon icon="play-skip-back" text="Last Step" />
        <FooterIcon icon="play" text="Run Play" />
        <FooterIcon icon="play-skip-forward" text="Next Step" />
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
          {/* TODO map over an object here, and arrange menu items */}
          <MenuIcon bg="yellow.400" icon="add-sharp" />
          <MenuIcon bg="red.400" icon="save" />
          <MenuIcon bg="red.400" icon="arrow-undo" />
          <MenuIcon bg="red.400" icon="play-forward" />
          <MenuIcon bg="green.400" icon="play" />
          <MenuIcon bg="red.400" icon="play-back" />
        </Stagger>
      </Modal>
    </Box>
  );
};

export default PlayFooter;
