import React from 'react';
import { Box, useDisclose, Stagger, Modal } from 'native-base';
import MenuIcon from './MenuIcon';

const PlayFab = () => {
  const { isOpen, onToggle } = useDisclose();

  return (
    <Box alignItems="center">
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
      <MenuIcon bg="cyan.600" icon="ellipsis-horizontal" onPress={onToggle} />
    </Box>
  );
};

export default PlayFab;
