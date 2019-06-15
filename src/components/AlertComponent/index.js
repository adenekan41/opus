import React from "react";
import { Box, Text } from "rebass";

const bgColors = {
  error: "#f66262",
  success: "#29cb98",
};

export function AlertComponent({ type, children }) {
  return (
    <Box px={16} py={16} bg={bgColors[type]} color="#fff">
      {children}
    </Box>
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
