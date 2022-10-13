import React from 'react';
import { IconButton } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const MenuIcon = ({ bg, icon }) => {
  return (
    <IconButton
      mb="4"
      variant="solid"
      bg={bg}
      size={12}
      colorScheme={bg.split('.')[0]} //color when pressed
      borderRadius="full"
      icon={<Ionicons name={icon} size={26} color="white" />}
    />
  );
};

export default MenuIcon;
