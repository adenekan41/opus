import React, { Component } from "react";
import { Flex } from "rebass";
import Button from "../../../../components/Button";
import CustomerForecastMap from "./thisCustomer/CustomerWeatherForcast";

export default class CreateCustomerWeatherStations extends Component {
  submit = data => {
    this.props.onSubmit(data);
  };

  render() {
    const {
      map,
      goBack,
      actions,
      dispatch,
      weatherStations,
      customerWeatherStations,
    } = this.props;

    return (
      <div>
        <CustomerForecastMap
          map={map}
          actions={actions}
          dispatch={dispatch}
          weatherStations={weatherStations}
          customerWeatherStations={customerWeatherStations}
          renderButtons={weatherStations => {
            return (
              <Flex alignItems="center" justifyContent="space-between" mt={5}>
                <Button
                  kind="gray"
                  width="300px"
                  onClick={goBack}
                  type="button"
                  mb="8px"
                >
                  Back
                </Button>
                <Button
                  kind="orange"
                  width="300px"
                  mb="8px"
                  onClick={() => this.submit(weatherStations)}
                >
                  Next
                </Button>
              </Flex>
            );
          }}
        />
      </div>
    );
  }
}
