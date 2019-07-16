import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import styled from 'styled-components';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates';
import { Flex, Text } from 'rebass';
import { DatePickerContainer, convertToMomentDate, CustomArrowIcon  } from "./index";
import moment from 'moment';

class SingleDatePickerComponent extends React.Component {
  state = {
    date: convertToMomentDate(this.props.date) || null,
    focusedInput: null,
  };
  render() {
    const { label, isInvalid, errorMessage, onChange, ...rest } = this.props;
    return (
      <DatePickerContainer>
        <Flex>
      	<SingleDatePicker
      	  {...rest}
      	  showDefaultInputIcon
      	  numberOfMonths={1}
		  date={this.state.date} // momentPropTypes.momentObj or null
		  customArrowIcon={<CustomArrowIcon />}
		   onDatesChange={date => {
              this.setState({ date }, () => {
                onChange(date);
              });
            }}
		  focusedInput={this.state.focusedInput} // PropTypes.bool
		  onFocusChange={({ focusedInput }) => this.setState({ focusedInput })} // PropTypes.func.isRequired
		  id="your_unique_id" // PropTypes.string.isRequired,
		/>
          <label className="label">{label}</label>
        </Flex>
        {isInvalid && (
          <Text color="#f66262" fontSize="12px" className="error">
            {errorMessage}
          </Text>
        )}
      </DatePickerContainer>
    );
  }
}

SingleDatePickerComponent.defaultProps = {
  label: 'Datee',
  minimumNights: 0,
  onChange: values => console.log(values),
  isOutsideRange: day => !isInclusivelyBeforeDay(day, moment())
};

export default SingleDatePickerComponent;
