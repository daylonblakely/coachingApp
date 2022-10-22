import React from 'react';
import { Center, Text, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const FooterIcon = ({ icon, onPress, text }) => {
  return (
    <Button variant="ghost" onPress={onPress}>
      <Center>
        <Ionicons name={icon} size={26} color="white" />
        <Text color="white" fontSize="12">
          {text}
        </Text>
      </Center>
    </Button>
  );
};

export default FooterIcon;
