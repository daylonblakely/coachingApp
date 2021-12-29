import React, { useContext } from 'react';
import { Box, Heading, Stack, Text } from 'native-base';
import { Context as DrillContext } from '../../context/DrillContext';
import DrillCategorySVG from '../../components/drills/DrillCategorySVG';
import DrillDetailTitle from '../../components/drills/DrillDetailTitle';

const DrillDetailScreen = ({ route, navigation }) => {
  const { state } = useContext(DrillContext);

  const { id } = route.params;
  const drill = state.find((d) => d.id === id);

  const renderDrillRequirements = (drill) => {
    return (
      <>
        {drill.requirements.length > 0 && (
          <Box>
            <Heading>Drill Requirements</Heading>
            <Box px="3">
              {drill.requirements.map((req, idx) => (
                <Text key={idx}>{`\u2022 ${req}`}</Text>
              ))}
            </Box>
          </Box>
        )}
      </>
    );
  };

  return (
    <>
      <DrillCategorySVG category={drill.category} />
      <Box
        // maxW="80%"
        rounded="sm"
        overflow="hidden"
        // borderWidth="1"
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        // marginTop="5px"
      >
        <Stack p="3" space={3}>
          <DrillDetailTitle
            title={drill.title}
            isIndividual={drill.isIndvidual}
          />
          <Text>{drill.description}</Text>
          {renderDrillRequirements(drill)}
          <Text>{drill.comments}</Text>
        </Stack>
      </Box>
    </>
  );
};

export default DrillDetailScreen;
