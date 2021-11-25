import React, { useContext } from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Box, FlatList, Spacer, Text } from 'native-base';
import { Context as DrillContext } from '../../context/DrillContext';

const DrillListScreen = ({ navigation }) => {
  const { state, fetchDrills } = useContext(DrillContext);

  return (
    <Box
      bg="primary.500"
      _text={{
        fontSize: 'md',
        fontWeight: 'medium',
        color: 'warmGray.50',
        letterSpacing: 'lg',
      }}
    >
      <FlatList
        data={state}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DrillDetail', { id: item.id })}
          >
            <Box>
              <Text>{item.title}</Text> <Spacer />
            </Box>
          </TouchableOpacity>
        )}
      />
    </Box>
    // <Box
    //   w={{
    //     base: '100%',
    //     md: '25%',
    //   }}
    //   bg="primary.700"
    // >
    //   <FlatList
    //     data={state}
    //     renderItem={({ item }) => {
    //       <Box>
    //         {item.title}
    //         <Spacer />
    //       </Box>;
    //     }}
    //   />
    // </Box>
    // <View>
    //   <Text>DrillListScreen</Text>
    //   <Button
    //     title="go to drill create screen"
    //     onPress={() => navigation.navigate('DrillCreate')}
    //   />
    //   <Button
    //     title="go to drill detail screen"
    //     onPress={() => navigation.navigate('DrillDetail')}
    //   />
    // </View>
  );
};

const styles = StyleSheet.create({});

export default DrillListScreen;
