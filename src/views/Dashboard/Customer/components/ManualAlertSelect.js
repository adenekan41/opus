import React, { useState } from "react";
import { Flex, Text, Heading } from "rebass";
import Card from "../../../../components/Card";
import Button from "../../../../components/Button";
import Switch from "../../../../components/Switch";

export default function ManualAlertSelect({ goBack, payload, onSubmit }) {
  let [manualAlert, setManualAlert] = useState(payload.manualAlert || false);

  return (
    <div>
      <Card height="480px">
        <Flex
          style={{ height: "100%" }}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Heading mb={2} fontWeight={500} fontSize={24}>
            Turn on Manual Alerts
          </Heading>
          <Text color="#8c8c8c">
            Allow customer to receive manual alerts
          </Text>
          <Flex alignItems="center" mt={4}>
            <Text color="#b4b4b4" mr={2}>
              No
            </Text>
            <Switch
              value={manualAlert}
              checked={manualAlert}
              onChange={() => {
                setManualAlert(!manualAlert);
              }}
            />
            <Text ml={2}>Yes</Text>
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
        <Button
          kind="orange"
          width="300px"
          mb="8px"
          onClick={() => onSubmit(manualAlert)}
        >
          Next
        </Button>
      </Flex>
    </div>
  );
}
