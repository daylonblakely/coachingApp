import React from 'react';
import { IconButton, VStack, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const MenuIcon = ({ bg, icon, onPress, text }) => {
  return (
    <VStack alignItems="center">
      <IconButton
        // mb="4"
        variant="solid"
        bg={bg}
        size={16}
        colorScheme={bg.split('.')[0]} //color when pressed
        borderRadius="full"
        onPress={onPress}
        icon={<Ionicons name={icon} size={32} color="white" />}
      />
      {text && (
        <Text color="white" mb="3">
          {text}
        </Text>
      )}
    </VStack>
  );
};

export default MenuIcon;
