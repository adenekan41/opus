import React from 'react';
import { Flex, Box } from 'rebass';
import { TagButton } from '../../../../components/Tags';

class FrequencySelect extends React.Component {
  render() {
    return (
      <Flex alignItems="center">
        <Box mr="20px">
          <TagButton>Sun</TagButton>
        </Box>
        <Box mr="20px">
          <TagButton>Mon</TagButton>
        </Box>
        <Box mr="20px">
          <TagButton>Tues</TagButton>
        </Box>
        <Box mr="20px">
          <TagButton>Wed</TagButton>
        </Box>
        <Box mr="20px">
          <TagButton>Thur</TagButton>
        </Box>
        <Box mr="20px">
          <TagButton>Fri</TagButton>
        </Box>
        <Box>
          <TagButton>Sat</TagButton>
        </Box>
      </Flex>
    );
  }
}

export default FrequencySelect;
