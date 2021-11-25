import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Context as DrillContext } from '../../context/DrillContext';

const DrillDetailScreen = ({ route, navigation }) => {
  const { state } = useContext(DrillContext);

  const { id } = route.params;
  const drill = state.find((d) => d.id === id);

  return (
    <View>
      <Text>{drill.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DrillDetailScreen;
