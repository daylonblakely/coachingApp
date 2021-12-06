import React from 'react';
import { useColorModeValue, Text, Box, Center } from 'native-base';

const DrawerHeader = () => {
  return (
    <Center
      bg={useColorModeValue('primary.600', 'gray.800')}
      height="100"
      marginBottom="20px"
      _text={{
        fontSize: 'lg',
        fontWeight: 'medium',
        color: 'warmGray.50',
      }}
    >
      Daylon
    </Center>
  );
};

export default DrawerHeader;
