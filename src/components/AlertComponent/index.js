import React, { useState } from "react";
import { Box, Flex } from "rebass";
import { EmptyIconButton } from "../Button";

const bgColors = {
  error: "#f66262",
  success: "#29cb98",
};

export function AlertComponent({ type, children }) {
  let [close, setClose] = useState(false);

  return (
    !close && (
      <Box px={16} py={16} bg={bgColors[type]} color="#fff">
        <Flex justifyContent="flex-end">
          <EmptyIconButton
            size="24px"
            icon="close"
            iconSize="16px"
            iconColor="white"
            onClick={() => setClose(true)}
          />
        </Flex>
        {children}
      </Box>
    )
  );
}

export function ErrorAlertComponent({ errors = [] }) {
  return (
    errors.length > 0 && (
      <AlertComponent type="error">
        <ul>
          {errors.map((error, i) => (
            <li key={`${error}-${i}`}>{error}</li>
          ))}
        </ul>
      </AlertComponent>
    )
  );
}
