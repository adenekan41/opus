import React, { Component } from "react";
import { Box, Flex, Text, Heading } from "rebass";
import Card from "../../../../components/Card";
import Button from "../../../../components/Button";
import Switch from "../../../../components/Switch";

export default class WeatherForecastSelect extends Component {
  render() {
    const { goBack } = this.props;
    return (
      <WeatherForecastSelect>
        <Card height="480px">
          <Flex
            style={{ height: "100%" }}
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Heading mb={2} fontWeight={500} fontSize={24}>
              Turn on Weather Forecast Messaging
            </Heading>
            <Text color="#8c8c8c">
              Allow customer to receive weather forecast messages
            </Text>
            <Flex alignItems="center" mt={4}>
              <Text color="#b4b4b4">No</Text>
              <Switch />
              <Text>Yes</Text>
            </Flex>
          </Flex>
        </Card>
        <Flex alignItems="center" justifyContent="space-between" mt={3}>
          <Button
            kind="gray"
            width="300px"
            onClick={goBack}
            type="button"
            mb="8px"
          >
            Back
          </Button>
          <Button kind="orange" width="300px" mb="8px">
            Next
          </Button>
        </Flex>
      </WeatherForecastSelect>
    );
  }
}
