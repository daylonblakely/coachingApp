import React from 'react';
import PropTypes from 'prop-types';
import { Center, Text, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const FooterIcon = ({ icon, onPress, text, disabled }) => {
  return (
    <Button variant="ghost" onPress={onPress} disabled={disabled}>
      <Center>
        <Icon
          as={Ionicons}
          name={icon}
          size={26}
          _dark={{ color: 'white' }}
          _light={{ color: 'secondary.600' }}
        />
        <Text fontSize="12" _light={{ color: 'secondary.600' }}>
          {text}
        </Text>
      </Center>
    </Button>
  );
};

FooterIcon.propTypes = {
  icon: PropTypes.string,
  onPress: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

export default FooterIcon;
