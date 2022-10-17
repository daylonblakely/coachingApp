import React from 'react';
import { IconButton, VStack, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const MenuIcon = ({ bg, icon }) => {
  return (
    <VStack alignItems="center">
      <IconButton
        // mb="4"
        variant="solid"
        bg={bg}
        size={12}
        colorScheme={bg.split('.')[0]} //color when pressed
        borderRadius="full"
        icon={<Ionicons name={icon} size={26} color="white" />}
      />
      <Text color="white" mb="3">
        Icon text
      </Text>
    </VStack>
  );
};

export default MenuIcon;
