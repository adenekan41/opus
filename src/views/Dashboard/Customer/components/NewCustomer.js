import React, { useState } from "react";
import { Box } from "rebass";
import styled from "styled-components";
import Breadcrumbs, { BreadcrumbItem } from "../../../../components/Breadcrumb";
import CustomerDetails from "./CustomerDetails";
import WeatherForecastSelect from "./WeatherForecastSelect";
import ConfirmPage from "./ConfirmPage";
import { errorCallback, getApiErrors } from "../../../../helpers/functions";
import toaster from "../../../../components/Toaster";
// import CreateCustomerAdvisoryModules from "./CreateCustomerAdvisoryModules";
import CreateCustomerWeatherStations from "./CreateCustomerWeatherStations";
import ManualAlertSelect from "./ManualAlertSelect";

const NewCustomerStyle = styled(Box)`
  .navigation {
    border-bottom: 1px solid #bababa;
    padding-bottom: 12px;
  }
`;

export default function NewCustomer({
  map,
  assets,
  history,
  actions,
  dispatch,
  weatherStations,
  weatherStationsList,
  // advisory_modules,
}) {
  let [current, setCurrent] = useState(0);
  let [payload, setPayload] = useState({});
  let [loading, setLoading] = useState(false);
  let [apiErrors, setApiErrors] = useState({});
  let crops = assets
    .filter(asset => asset.is_crop)
    .map(crop => ({ label: crop.name, value: crop.id }));
  let countries = assets
    .filter(asset => asset.is_country)
    .map(country => ({ label: country.name, value: country.id }));

  const next = () => {
    current += 1;
    setCurrent(current);
  };

  const prev = () => {
    current -= 1;
    setCurrent(current);
  };

  const updateCustomerPayload = values => {
    setPayload({ ...payload, ...values });
    next();
  };

  const updateApiErrors = errorPayload => {
    setApiErrors(errorPayload);
  };

  const cancelCustomerCreation = () => {
    setPayload({});
    history.push("/dashboard/customers");
  };

  const getPayloadWeatherStations = weather_stations => {
    let selectedWeatherStations = weather_stations.map(s => s.station_name);
    let result = weatherStationsList.filter(station =>
      selectedWeatherStations.includes(station.station_name)
    );

    return result.map(station => station.id);
  };

  const submitCustomerPayload = () => {
    const {
      manualAlert,
      automaticAlert,
      advisory_modules,
      weather_stations,
      ...rest
    } = payload;
    const data = {
      ...rest,
      password: "password",
      is_customer: true,
      receive_manual_messages: manualAlert,
      receive_automatic_messages: automaticAlert,
      weather_stations: getPayloadWeatherStations(weather_stations),
      receive_advisory_messages:
        (advisory_modules && advisory_modules.length > 0) || false,
    };

    setLoading(true);

    dispatch({ type: actions.CREATE_USER, value: data })
      .then(() => {
        setLoading(false);
        setPayload({});
        toaster.success("Customer created successfully");
        history.push("/dashboard/customers");
      })
      .catch(error => {
        setLoading(false);
        errorCallback(error, updateApiErrors);
      });
  };

  return (
    <NewCustomerStyle py="40px" px="40px">
      <Box mb="40px" className="navigation">
        <Breadcrumbs>
          <BreadcrumbItem isActive={current === 0}>
            Customer Details
          </BreadcrumbItem>
          <BreadcrumbItem isActive={current === 1}>
            Weather Stations
          </BreadcrumbItem>
          {/* <BreadcrumbItem isActive={current === 2}>Advisory Messages</BreadcrumbItem> */}
          <BreadcrumbItem isActive={current === 2}>
            Manual Alerts
          </BreadcrumbItem>
          <BreadcrumbItem isActive={current === 3}>
            Weather Forecast
          </BreadcrumbItem>
          <BreadcrumbItem isActive={current === 4}>Confirmation</BreadcrumbItem>
        </Breadcrumbs>
      </Box>

      <Box>
        {current === 0 && (
          <CustomerDetails
            crops={crops}
            payload={payload}
            countries={countries}
            onCancel={cancelCustomerCreation}
            onSubmit={values => updateCustomerPayload(values)}
          />
        )}
        {current === 1 && (
          <CreateCustomerWeatherStations
            map={map}
            goBack={prev}
            actions={actions}
            dispatch={dispatch}
            weatherStations={weatherStations}
            customerWeatherStations={payload.weather_stations}
            onSubmit={values =>
              updateCustomerPayload({ weather_stations: values })
            }
          />
        )}
        {/* {current === 1 && (
          <CreateCustomerAdvisoryModules
            goBack={prev}
            payload={payload}
            advisory_modules={advisory_modules}
            onSubmit={values => updateCustomerPayload(values)}
          />
        )} */}
        {current === 2 && (
          <ManualAlertSelect
            goBack={prev}
            payload={payload}
            onSubmit={values => updateCustomerPayload({ manualAlert: values })}
          />
        )}
        {current === 3 && (
          <WeatherForecastSelect
            goBack={prev}
            payload={payload}
            onSubmit={values =>
              updateCustomerPayload({ weatherForecast: values })
            }
          />
        )}
        {current === 4 && (
          <ConfirmPage
            crops={crops}
            goBack={prev}
            payload={payload}
            loading={loading}
            countries={countries}
            apiErrors={getApiErrors(apiErrors)}
            onSubmit={submitCustomerPayload}
          />
        )}
      </Box>
    </NewCustomerStyle>
  );
}
