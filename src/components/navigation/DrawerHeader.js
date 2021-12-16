import React from 'react';
import {
  useColorModeValue,
  Heading,
  Text,
  Box,
  Stack,
  Circle,
} from 'native-base';

const DrawerHeader = () => {
  const backgroundColor = useColorModeValue('primary.600', 'darkModeHeader');
  return (
    <Box
      height="100"
      marginBottom="20px"
      bg={backgroundColor}
      flexDirection="row"
      alignItems="center"
    >
      <Box
        space={4}
        flexDirection="row"
        alignItems="center"
        left="4"
        bg={backgroundColor}
      >
        <Circle
          size="md"
          bg={useColorModeValue('secondary.600', 'primary.600')}
          _text={{
            fontWeight: 'bold',
            fontSize: '3xl',
          }}
          marginRight="4"
        >
          D
        </Circle>
        <Stack bg={backgroundColor}>
          <Heading fontSize="lg">Daylon Blakely</Heading>
          <Text fontSize="sm">Coach</Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default DrawerHeader;
