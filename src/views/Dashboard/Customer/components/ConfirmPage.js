import React from "react";
import styled from "styled-components";
import { Heading, Flex, Box, Text } from "rebass";
import Card from "../../../../components/Card";
import Button from "../../../../components/Button";
import { ErrorAlertComponent } from "../../../../components/AlertComponent";

const ConfirmPageStyle = styled.div`
  .confirm-section {
    border-right: 1px solid #ebebeb;
    flex: 1;
    padding: 16px;

    &:last-of-type {
      border-right: none;
      padding: 0;
    }

    &__weather-forecast,
    &__manual-alerts,
    &__automatic-alerts {
      padding: 16px;
      border-bottom: 1px solid #ebebeb;
    }

    .pill {
      width: 80px;
      height: 34px;
      color: #fff;
      display: flex;
      text-align: center;
      align-items: center;
      border-radius: 100px;
      justify-content: center;

      &.success {
        background-color: #29cb98;
      }

      &.error {
        background-color: #f66767;
      }
    }
  }
`;

export default function ConfirmPage({
  crops,
  goBack,
  payload = {},
  loading,
  apiErrors,
  onSubmit,
  countries,
}) {
  const crop = crops.find(crop => crop.value === payload.crop_managed);
  const country = countries.find(country => country.value === payload.country);
  
  return (
    <ConfirmPageStyle>
      <Box my={3}>
        <ErrorAlertComponent errors={apiErrors} />
      </Box>
      <Heading mb={4} fontWeight={500} fontSize={20}>
        Confirmation
      </Heading>
      <Card>
        <Flex>
          <Box className="confirm-section">
            <Heading color="#8c8c8c" fontWeight={500} fontSize={20} mb={3}>
              Customer Details
            </Heading>
            <Box>
              <Box className="customer-details-data" mb={2}>
                <Text color="#8c8c8c" fontSize={14} fontWeight={500} mb={2}>
                  First Name
                </Text>
                <Text>{payload.first_name}</Text>
              </Box>
              {payload.other_name && (
                <Box className="customer-details-data" mb={2}>
                  <Text color="#8c8c8c" fontSize={14} fontWeight={500} mb={2}>
                    Middle Name
                  </Text>
                  <Text>{payload.other_name}</Text>
                </Box>
              )}
              <Box className="customer-details-data" mb={2}>
                <Text color="#8c8c8c" fontSize={14} fontWeight={500} mb={2}>
                  Last Name
                </Text>
                <Text>{payload.last_name}</Text>
              </Box>
              <Box className="customer-details-data" mb={2}>
                <Text color="#8c8c8c" fontSize={14} fontWeight={500} mb={2}>
                  Crop Managed
                </Text>
                <Text>{crop && crop.label}</Text>
              </Box>
              <Box className="customer-details-data" mb={2}>
                <Text color="#8c8c8c" fontSize={14} fontWeight={500} mb={2}>
                  City
                </Text>
                <Text>{payload.city}</Text>
              </Box>
              <Box className="customer-details-data" mb={2}>
                <Text color="#8c8c8c" fontSize={14} fontWeight={500} mb={2}>
                  Country
                </Text>
                <Text>
                  {country && country.label
                  }
                </Text>
              </Box>
              <Box className="customer-details-data" mb={2}>
                <Text color="#8c8c8c" fontSize={14} fontWeight={500} mb={2}>
                  Company
                </Text>
                <Text>{payload.organisation_name}</Text>
              </Box>
              <Box className="customer-details-data" mb={2}>
                <Text color="#8c8c8c" fontSize={14} fontWeight={500} mb={2}>
                  Phone No.
                </Text>
                <Text>{payload.phone_number}</Text>
              </Box>
              <Box className="customer-details-data" mb={2}>
                <Text color="#8c8c8c" fontSize={14} fontWeight={500} mb={2}>
                  Email Address
                </Text>
                <Text>{payload.email}</Text>
              </Box>
            </Box>
          </Box>
          <Box className="confirm-section">
            <Heading color="#8c8c8c" fontWeight={500} fontSize={20} mb={3}>
              Weather Stations
            </Heading>
            <Box>
              {payload.weather_stations &&
              payload.weather_stations.length > 0 ? (
                payload.weather_stations.map(station => (
                  <Flex alignItems="center" mb={3}>
                    <i className="ion-pin mr-3" />
                    <Text>{station.station_name}</Text>
                  </Flex>
                ))
              ) : (
                <Text>No weather stations for customer</Text>
              )}
            </Box>
          </Box>
          <Box className="confirm-section">
            <Heading color="#8c8c8c" fontWeight={500} fontSize={20} mb={3}>
              Advisory Messages
            </Heading>
            <Box>
              {payload.advisory_modules &&
              payload.advisory_modules.length > 0 ? (
                payload.advisory_modules.map(advisory_module => (
                  <Text mb={3}>{advisory_module.name}</Text>
                ))
              ) : (
                <Text>No advisory modules for customer</Text>
              )}
            </Box>
          </Box>
          <Box className="confirm-section">
            <Box className="confirm-section__weather-forecast">
              <Heading color="#8c8c8c" fontWeight={500} fontSize={20} mb={3}>
                Weather Forecast
              </Heading>
              <Box
                className={`pill ${
                  payload.weatherForecast ? "success" : "error"
                }`}
              >
                {payload.weatherForecast ? "Yes" : "No"}
              </Box>
            </Box>
            <Box className="confirm-section__manual-alerts">
              <Heading color="#8c8c8c" fontWeight={500} fontSize={20} mb={3}>
                Manual Alerts
              </Heading>
              <Box
                className={`pill ${payload.manualAlert ? "success" : "error"}`}
              >
                {payload.manualAlert ? "Yes" : "No"}
              </Box>
            </Box>
            <Box className="confirm-section__automatic-alerts">
              <Heading color="#8c8c8c" fontWeight={500} fontSize={20} mb={3}>
                Automatic Alerts
              </Heading>
              <Box
                className={`pill ${
                  payload.automaticAlert ? "success" : "error"
                }`}
              >
                {payload.automaticAlert ? "Yes" : "No"}
              </Box>
            </Box>
          </Box>
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
          mb="8px"
          kind="orange"
          width="300px"
          isLoading={loading}
          onClick={onSubmit}
        >
          Done
        </Button>
      </Flex>
    </ConfirmPageStyle>
  );
}
