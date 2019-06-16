import React from "react";
import { Box } from "rebass";
import styled from "styled-components";
import Breadcrumbs, { BreadcrumbItem } from "../../../../components/Breadcrumb";
import CustomerDetails from "./CustomerDetails";
import CustomerForecastMap from "./thisCustomer/CustomerWeatherForcast";
import CustomerAdvisoryModules from "./thisCustomer/CustomerAdvisory";
import WeatherForecastSelect from "./WeatherForecastSelect";

const NewCustomerStyle = styled(Box)`
  .navigation {
    border-bottom: 1px solid #bababa;
    padding-bottom: 12px;
  }
`;

export default function NewCustomer({ assets }) {
  let crops = assets
    .filter(asset => asset.is_crop)
    .map(crop => ({ label: crop.name, value: crop.id }));
  let countries = assets
    .filter(asset => asset.is_country)
    .map(country => ({ label: country.name, value: country.id }));
  return (
    <NewCustomerStyle py="40px" px="40px">
      <Box mb="40px" className="navigation">
        <Breadcrumbs>
          <BreadcrumbItem isActive>Customer Details</BreadcrumbItem>
          <BreadcrumbItem>Weather Stations</BreadcrumbItem>
          <BreadcrumbItem>Advisory Messages</BreadcrumbItem>
          <BreadcrumbItem>Weather Forecast</BreadcrumbItem>
          <BreadcrumbItem>Confirmation</BreadcrumbItem>
        </Breadcrumbs>
      </Box>

      <Box>
        <CustomerDetails crops={crops} countries={countries} />
        <CustomerForecastMap />
        <CustomerAdvisoryModules/>
        <WeatherForecastSelect/>
      </Box>
    </NewCustomerStyle>
  );
}
