import React from 'react';
import { StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Box,
  useColorMode,
  useColorModeValue,
  Divider,
  Heading,
  HStack,
  Icon,
  List,
  Switch,
  Text,
} from 'native-base';

const CustomDrawerContent = (props) => {
  const { toggleColorMode } = useColorMode();
  return (
    // <Box bg={useColorModeValue('white', 'grey')} h="100%">
    <DrawerContentScrollView {...props} styles={styles.container}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <DrawerItem
        label={(focused, color) => <Text>Toggle color mode</Text>}
        onPress={toggleColorMode}
      />
    </DrawerContentScrollView>
    // </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: 10,
  },
});

export default CustomDrawerContent;
