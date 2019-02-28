import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import styled from 'styled-components';
import { DateRangePicker } from 'react-dates';
import { Flex, Text } from 'rebass';
import moment from 'moment';

const DatePickerContainer = styled.div`
  display: flex;
  position: relative;
  height: 60px;
  box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 3px;
  ${props => (props.isInvalid ? 'border: solid 0.5px #f66262 ' : '')};
  ${props =>
    props.disabled &&
    `
  border: solid 1px rgba(18, 18, 18, 0.11);
  background-color: #f5f4f4;
  cursor: not-allowed;`};

  &:focus-within {
    outline: none;
    border: solid 0.5px rgba(255, 153, 1, 0.8);

    .label {
      font-size: 75%;
      transform: translate3d(0, -30%, 0);
      opacity: 1;
      color: #b4b4b4;
    }
  }
  .DateRangePickerInput {
    border: none;
    background-color: transparent;
    position: relative;
    width: 100%;
    top: 14px;
  }
  .DateInput {
    background: transparent;

    &_input {
      background: transparent;
      font-size: 16px;

      &__focused {
        border-bottom: none;
      }
    }
  }

  .label {
    display: inline-block;
    position: absolute;
    z-index: 2;
    top: 10px;
    color: #b4b4b4;
    padding: 8px 0 8px 16px;
    font-size: 75%;
    transform: translate3d(0, -30%, 0);
    opacity: 1;
  }

  .error {
    position: absolute;
    top: 44px;
    padding: 0 16px;
  }
`;

const CustomArrowIcon = styled.div`
  width: 16px;
  height: 2px;
  position: relative;
  left: -10px;
  background-color: #242424;
`;

const convertToMomentDate = value => moment(value);

class DatePicker extends React.Component {
  state = {
    startDate: convertToMomentDate(this.props.startDate) || null,
    endDate: convertToMomentDate(this.props.endDate) || null,
    focusedInput: null,
  };
  render() {
    const { label, isInvalid, errorMessage, onChange } = this.props;
    return (
      <DatePickerContainer>
        <Flex>
          <DateRangePicker
            showDefaultInputIcon
            customArrowIcon={<CustomArrowIcon />}
            startDate={this.state.startDate}
            startDateId="your_unique_start_date_id"
            endDate={this.state.endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={({ startDate, endDate }) => {
              this.setState({ startDate, endDate }, () => {
                if (startDate && endDate) {
                  onChange({
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                  });
                }
              });
            }}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
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

DatePicker.defaultProps = {
  label: 'Date range',
  onChange: values => console.log(values),
};

export default DatePicker;
