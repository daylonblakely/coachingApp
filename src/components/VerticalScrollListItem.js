import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Stack,
  VStack,
  Spacer,
  Text,
  ChevronRightIcon,
  HStack,
} from 'native-base';

const VerticalScrollListItem = ({ title, subtitle }) => {
  return (
    <Box variant="card" borderBottomWidth="1" rounded="lg" overflow="hidden">
      <Stack p="4" space={3}>
        <HStack alignItems="center">
          <VStack>
            <Text bold>{title}</Text>
            <Text fontSize="md">{subtitle}</Text>
          </VStack>
          <Spacer />
          <ChevronRightIcon size="6" />
        </HStack>
      </Stack>

      {/* <Spacer /> */}
    </Box>
  );
};

VerticalScrollListItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default VerticalScrollListItem;
