import React from "react";
import styled from "styled-components";
import { Box, Heading } from "rebass";
import CustomerForm from "./CustomerForm";

const CustomerDetailsStyle = styled(Box)`
  max-width: 640px;
  margin: 100px auto;
`;

export default function CustomerDetails({ crops, onSubmit, countries }) {
  return (
    <CustomerDetailsStyle>
      <Heading textAlign="center" mb={4} fontWeight={500} fontSize={20}>Create Customer</Heading>
      <CustomerForm crops={crops} onSubmit={onSubmit} countries={countries} />
    </CustomerDetailsStyle>
  );
}
