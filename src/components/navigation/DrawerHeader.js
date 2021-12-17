import React from 'react';
import { StatusBar, Platform } from 'react-native';
import {
  useColorModeValue,
  Heading,
  Text,
  Box,
  Stack,
  Circle,
} from 'native-base';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const DrawerHeader = () => {
  const backgroundColor = useColorModeValue('primary.600', 'darkModeHeader');
  return (
    <Box
      height="130"
      marginBottom="20px"
      paddingTop={STATUS_BAR_HEIGHT}
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
          <Heading fontSize="lg" color="white">
            Daylon Blakely
          </Heading>
          <Text fontSize="sm" color="white">
            Coach
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default DrawerHeader;
