import React from 'react';
import {
  Box,
  useDisclose,
  IconButton,
  Stagger,
  Icon,
  Modal,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MenuIcon from './MenuIcon';

const PlayMenu = () => {
  const { isOpen, onToggle } = useDisclose();

  return (
    <Box position="absolute" right={5} bottom={5} alignItems="center">
      <Modal isOpen={isOpen} onClose={onToggle}>
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
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
      <IconButton
        variant="solid"
        borderRadius="full"
        size={12}
        onPress={onToggle}
        bg="cyan.600"
        icon={
          <Icon
            as={MaterialCommunityIcons}
            size="2xl"
            name="dots-horizontal"
            color="warmGray.50"
            _dark={{
              color: 'warmGray.50',
            }}
          />
        }
      />
    </Box>
  );
};

export default PlayMenu;
