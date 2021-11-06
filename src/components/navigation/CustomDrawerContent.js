import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useColorMode, Text } from 'native-base';

const CustomDrawerContent = (props) => {
  const { toggleColorMode } = useColorMode();
  return (
    <DrawerContentScrollView {...props}>
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
  );
};

export default CustomDrawerContent;
