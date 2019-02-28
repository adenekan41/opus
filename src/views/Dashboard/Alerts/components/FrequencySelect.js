import React from 'react';
import { Flex, Box, Text } from 'rebass';
import { TagButton } from '../../../../components/Tags';

class FrequencySelect extends React.Component {
  state = {
    days: [
      { value: 'sunday', label: 'Sun' },
      { value: 'monday', label: 'Mon' },
      { value: 'tuesday', label: 'Tues' },
      { value: 'wednesday', label: 'Wed' },
      { value: 'thursday', label: 'Thur' },
      { value: 'friday', label: 'Fri' },
      { value: 'saturday', label: 'Sat' },
    ],
    selectedDays: [],
  };
  addToSelectedDays = value => {
    let dayToAdd = this.state.days.find(
      day => day.value.toLowerCase() === value
    );
    this.setState(
      ({ selectedDays }) => ({
        selectedDays: [dayToAdd, ...selectedDays],
      }),
      () => {
        const { selectedDays } = this.state;
        this.props.onChange(selectedDays);
      }
    );
  };

  removeFromSelectedDays = value => {
    this.setState(
      ({ selectedDays }) => ({
        selectedDays: selectedDays.filter(
          day => day.value.toLowerCase() !== value
        ),
      }),
      () => {
        const { selectedDays } = this.state;
        this.props.onChange(selectedDays);
      }
    );
  };

  onDayClick = day => {
    let { selectedDays } = this.state;
    let selectedDaysLabels = selectedDays.map(day => day.value.toLowerCase());
    if (selectedDaysLabels.includes(day)) {
      this.removeFromSelectedDays(day);
    } else {
      this.addToSelectedDays(day);
    }
  };
  render() {
    const { label } = this.props;
    let selectedDaysLabels = this.state.selectedDays.map(day =>
      day.label.toLowerCase()
    );
    return (
      <Box>
        <Text color="#8c8c8c" fontSize="14px" mb="8px">
          {label}
        </Text>
        <Flex alignItems="center">
          {this.state.days.map((day, i) => (
            <Box mr="20px" key={`${day.value}-${i}`}>
              <TagButton
                isActive={selectedDaysLabels.includes(day.label.toLowerCase())}
                onClick={() => this.onDayClick(day.value.toLowerCase())}
              >
                {day.label}
              </TagButton>
            </Box>
          ))}
        </Flex>
      </Box>
    );
  }
}

export default FrequencySelect;
