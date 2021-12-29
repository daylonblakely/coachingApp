import React from 'react';
import { Box, Heading, Divider, useColorModeValue } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const DrillDetailTitle = ({ title, isIndividual }) => {
  const iconColor = useColorModeValue('black', 'white');
  return (
    <>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading>{title}</Heading>
        {isIndividual ? (
          <Ionicons name="person-outline" size={24} color={iconColor} />
        ) : (
          <Ionicons name="people-outline" size={24} color={iconColor} />
        )}
      </Box>

      <Divider my="1" thickness="1.5" />
    </>
  );
};

export default DrillDetailTitle;
