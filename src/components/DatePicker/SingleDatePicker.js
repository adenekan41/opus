import React from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker, isInclusivelyBeforeDay } from "react-dates";
import { Flex, Text } from "rebass";
import {
  DatePickerContainer,
  convertToMomentDate,
  CustomArrowIcon,
} from "./index";
import moment from "moment";

class SingleDatePickerComponent extends React.Component {
  state = {
    date: convertToMomentDate(this.props.date) || null,
    focused: null,
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
            onDateChange={date => {
              this.setState({ date }, () => {
                onChange(date);
              });
            }}
            focused={this.state.focused}
            onFocusChange={({ focused }) =>
              this.setState({ focused })
            } 
            id="your_unique_id"
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
  label: "Date",
  minimumNights: 0,
  onChange: values => console.log(values),
  isOutsideRange: day => !isInclusivelyBeforeDay(day, moment()),
};

export default SingleDatePickerComponent;
