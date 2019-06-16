import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Box } from "rebass";
import CustomerDetails from "./CustomerDetails";
import CustomerOrganisation from "./CustomerOrganisation";
import CustomerBilling from "./CustomerBilling";
import Breadcrumbs, {
  BreadcrumbItem,
} from "../../../../../components/Breadcrumb";
import TabNav from "../../../../../components/TabNav";
import CustomerForecastMap from "./CustomerWeatherForcast";
// import CustomerAdvisoryModules from "./CustomerAdvisory";
import { FullScreenSpinner } from "../../../../../components/Spinner";
import Button from "../../../../../components/Button";
import toaster from "../../../../../components/Toaster";
import { errorCallback } from "../../../../../helpers/functions";

export default class thisCustomer extends Component {
  state = {
    user: {},
    buttonLoading: false,
    loading: true,
  };

  componentDidMount() {
    const id =
      window.location.pathname && window.location.pathname.split("/")[3];

    this.getCustomer(id);
  }

  getCustomer = id => {
    const { dispatch, actions } = this.props;

    dispatch({ type: actions.GET_USER, value: id }).then(data => {
      this.setState({
        user: data,
        loading: false,
      });
    });
  };

  getPayloadWeatherStations = weather_stations => {
    let selectedWeatherStations = weather_stations.map(s => s.station_name);
    let result = this.props.weatherStationsList.filter(station =>
      selectedWeatherStations.includes(station.station_name)
    );

    return result.map(station => station.id);
  };

  onCustomerUpdate = values => {
    const { dispatch, actions } = this.props;
    const id =
      window.location.pathname && window.location.pathname.split("/")[3];

    this.setState({ buttonLoading: true });

    dispatch({
      type: actions.PATCH_USER,
      value: values,
    })
      .then(() => {
        this.setState({
          buttonLoading: false,
        });
        toaster.success("Customer updated successful");
        this.getCustomer(id)
      })
      .catch(error => {
        this.setState({
          buttonLoading: false,
        });
        errorCallback(error);
      });
  };

  render() {
    const { user, buttonLoading } = this.state;
    const { weatherStations, map, actions, dispatch, assets } = this.props;
    const id =
      window.location.pathname && window.location.pathname.split("/")[3];
    const countries = assets
      .filter(asset => asset.is_country)
      .map(country => ({ label: country.name, value: country.id }));

    return this.state.loading ? (
      <FullScreenSpinner
        size={32}
        thickness="4px"
        height="calc(100vh - 140px)"
        width="calc(100% - 344px)"
      />
    ) : (
      <Box py="40px" px="40px">
        <Box mb="40px">
          <Breadcrumbs>
            <BreadcrumbItem url="/dashboard/customers" useNavlink>
              Customer
            </BreadcrumbItem>
            <BreadcrumbItem isActive>{user.first_name}</BreadcrumbItem>
          </Breadcrumbs>
        </Box>
        <Box>
          <TabNav
            links={[
              {
                url: `/dashboard/customers/${id}/edit`,
                label: "Profile",
                icon: "user",
              },
              {
                url: `/dashboard/customers/${id}/edit/organisation`,
                label: "Organisation Information",
                icon: "combine--box",
                flex: "0 0 239px",
                max: "239px",
              },
              {
                url: `/dashboard/customers/${id}/edit/billing`,
                label: "Billing Information",
                icon: "shapes-doc",
                flex: "0 0 204px",
                max: "204px",
              },
              {
                url: `/dashboard/customers/${id}/edit/weather-forcast`,
                label: "Weather Stations",
                icon: "weather",
                flex: "0 0 204px",
                max: "204px",
              },
              // {
              //   url: `/dashboard/customers/${id}/edit/advisory-modules`,
              //   label: "Advisory Modules",
              //   icon: "weather",
              //   flex: "0 0 204px",
              //   max: "204px",
              // },
            ]}
            useNavLink
          >
            <>
              <Route
                exact
                path={`/dashboard/customers/${id}/edit`}
                render={props => (
                  <CustomerDetails {...{ props, ...user, actions, dispatch }} />
                )}
              />
              <Route
                exact
                path={`/dashboard/customers/${id}/edit/organisation`}
                render={props => (
                  <CustomerOrganisation
                    {...{ props, ...user, actions, dispatch, countries, getCustomer: this.getCustomer }}
                  />
                )}
              />
              <Route
                exact
                path={`/dashboard/customers/${id}/edit/billing`}
                render={props => (
                  <CustomerBilling {...{ props, actions, dispatch, ...user, getCustomer: this.getCustomer }} />
                )}
              />
              <Route
                exact
                path={`/dashboard/customers/${id}/edit/weather-forcast`}
                render={props => (
                  <CustomerForecastMap
                    {...{ map, props, actions, dispatch, ...user }}
                    weatherStations={weatherStations}
                    renderButtons={weatherStations => {
                      console.log(weatherStations);
                      return (
                        <Box mt={4}>
                          <Button
                            kind="orange"
                            width="300px"
                            mb="8px"
                            isLoading={buttonLoading}
                            onClick={() => {
                              let data = this.getPayloadWeatherStations(
                                weatherStations
                              );
                              this.onCustomerUpdate({
                                id: user.id,
                                weather_stations: data,
                              });
                            }}
                          >
                            Save Changes
                          </Button>
                        </Box>
                      );
                    }}
                    customerWeatherStations={user.weather_stations}
                  />
                )}
              />
              {/* <Route
                exact
                path={`/dashboard/customers/${id}/edit/advisory-modules`}
                render={props => <CustomerAdvisoryModules {...{ props, ...user }} />}
              /> */}
            </>
          </TabNav>
        </Box>
      </Box>
    );
  }
}
