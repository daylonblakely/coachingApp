import React from 'react';
import { Box, HStack } from 'native-base';
import PlayFab from './PlayFab';
import FooterIcon from './FooterIcon';
import MenuIcon from './MenuIcon';

const PlayFooter = () => {
  return (
    <Box bg="blue.300">
      <HStack justifyContent="flex-start" space={3}>
        <FooterIcon icon="save" text="Save" />
        <FooterIcon icon="play-back" text="Previous" />
        <FooterIcon icon="play" text="Run Play" />
        <FooterIcon icon="play-forward" text="Next" />
      </HStack>
      <Box position="absolute" top="-50%" right="5">
        <MenuIcon bg="cyan.600" icon="ellipsis-horizontal" />
      </Box>
    </Box>
  );
};

export default PlayFooter;
