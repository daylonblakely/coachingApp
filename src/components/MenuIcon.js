import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, VStack, Text, useColorModeValue } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const MenuIcon = ({ bg, icon, onPress, text, disabled, ...rest }) => {
  const lineColor = useColorModeValue('white', 'black');

  return (
    <VStack alignItems="center">
      <IconButton
        // mb="4"
        disabled={disabled}
        variant="solid"
        size={16}
        colorScheme={bg.split('.')[0]} //color when pressed
        borderRadius="full"
        onPress={onPress}
        icon={<Ionicons name={icon} size={32} color={lineColor} />}
        {...rest}
      />
      {text && (
        <Text color={lineColor} mb="3">
          {text}
        </Text>
      )}
    </VStack>
  );
};

MenuIcon.propTypes = {
  bg: PropTypes.string,
  icon: PropTypes.string,
  onPress: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

export default MenuIcon;
