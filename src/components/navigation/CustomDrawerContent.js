import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useColorMode, Text, Box } from 'native-base';
import DrawerHeader from './DrawerHeader';

const CustomDrawerContent = (props) => {
  const { toggleColorMode } = useColorMode();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerHeader />
      <DrawerItemList {...props} />
      <DrawerItem
        label={(focused, color) => <Text>Toggle color mode</Text>}
        onPress={toggleColorMode}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
