import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Box, FlatList } from 'native-base';
import VerticalScrollListItem from './VerticalScrollListItem';

const VerticalScrollList = ({ data, onPress }) => {
  return (
    <Box>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item)}>
            <VerticalScrollListItem
              title={item.title}
              subtitle={item.category}
            />
          </TouchableOpacity>
        )}
      />
    </Box>
  );
};

VerticalScrollList.propTypes = {
  data: PropTypes.array.isRequired,
  onPress: PropTypes.func,
};

export default VerticalScrollList;
