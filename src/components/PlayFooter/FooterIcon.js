import React from 'react';
import { Center, Text, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const FooterIcon = ({ icon, onPress, text }) => {
  return (
    <Button variant="ghost" onPress={onPress}>
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

export default FooterIcon;
