import React from 'react';
import { DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useColorMode, Text } from 'native-base';
import DrawerHeader from './DrawerHeader';

const CustomDrawerContent = (props) => {
  const { toggleColorMode } = useColorMode();
  return (
    <>
      <DrawerHeader />
      <DrawerItemList {...props} />
      <DrawerItem
        label={(focused, color) => <Text>Toggle color mode</Text>}
        onPress={toggleColorMode}
      />
    </>
  );
};

export default CustomDrawerContent;
