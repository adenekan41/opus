import React from "react";
import moment from "moment";
import { Box, Flex, Text, Heading } from "rebass";
import CompareChart from "./CompareChart";
import Breadcrumbs, { BreadcrumbItem } from "../../../components/Breadcrumb";
import Dropdown from "../../../components/Select";
import DatePicker from "../../../components/DatePicker";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import CheckboxSelect from "../../../components/CheckboxSelect";
import { Icon } from "../../../components/Icon";
import { WEATHER_OPTIONS } from "../../../helpers/constants";
import { createCSV } from "../../../helpers/functions";
import { Spinner } from "../../../components/Spinner";
import { Toast } from "../../../components/Toast";

class Compare extends React.Component {
  state = {
    data: [],
    loading: false,
    buttonLoading: false,
    observationTimes: [],
    endDate: moment(new Date()),
    startDate: moment(new Date()),
    selectedStations: [],
    error: false,
    errorMessage: "",
  };

  getWeatherTypeData = (type, dates) => {
    const { dispatch, actions } = this.props;
    let data = dispatch({
      type: actions.FILTER_COMPARE_LOGS_BY_TYPE,
      value: { type, dates },
    });
    let { result, observationTimes } = data;
    this.setState({
      data: result,
      observationTimes,
    });
  };

  exportDataToCsv = () => {
    const { dispatch, actions, compareType } = this.props;
    const { selectedStations, startDate, endDate } = this.state;

    this.setState({ buttonLoading: true, error: false, errorMessage: "" });

    dispatch({
      type: actions.EXPORT_COMPARE_DATA_CSV,
      value: {
        station_names: selectedStations,
        weather_type: compareType,
        start_date: startDate,
        end_date: endDate,
      },
    })
      .then(data => {
        this.setState({ buttonLoading: false });
        createCSV(data);
      })
      .catch(() => {
        this.setState({
          error: true,
          buttonLoading: false,
          errorMessage: "Unable to export data. Please try again.",
        });
      });
  };

  utilityCallback = ({ actionType, station, startDate, endDate }) => {
    let { dispatch, compareType } = this.props;
    dispatch({
      type: actionType,
      value: station,
    }).then(() => {
      this.setState({ loading: false });
      this.getWeatherTypeData(compareType, {
        startDate,
        endDate,
      });
    });
  };

  checkboxSelectOptionClicked = station => {
    let { selectedStations, startDate, endDate } = this.state;
    let { actions } = this.props;
    this.setState({ loading: true });
    if (selectedStations.includes(station)) {
      this.setState(
        ({ selectedStations }) => ({
          selectedStations: selectedStations.filter(item => item !== station),
        }),
        () => {
          this.utilityCallback({
            station,
            endDate,
            startDate,
            actionType: actions.REMOVE_COMPARE_STATION_DATA,
          });
        }
      );
    } else {
      this.setState(
        ({ selectedStations }) => ({
          selectedStations: [station, ...selectedStations],
        }),
        () => {
          this.utilityCallback({
            station,
            endDate,
            startDate,
            actionType: actions.GET_COMPARE_STATION_DATA,
          });
        }
      );
    }
  };

  render() {
    const { compareType, weatherStations } = this.props;
    let {
      data,
      error,
      endDate,
      loading,
      startDate,
      errorMessage,
      buttonLoading,
      observationTimes,
      selectedStations,
    } = this.state;
    let checkboxSelectOptions = weatherStations.map(station => ({
      label: station.station_name,
      value: station.station_name,
    }));
    return (
      <Box py="40px" px="40px">
        <Box mb="40px">
          <Breadcrumbs>
            <BreadcrumbItem url="/dashboard/weather-data/map" useNavlink>
              Map
            </BreadcrumbItem>
            <BreadcrumbItem isActive>Compare</BreadcrumbItem>
          </Breadcrumbs>
        </Box>
        <Box className="row">
          <Box className="col-md-3">
            <CheckboxSelect
              label="Weather Station"
              selected={selectedStations}
              placeholder="Select a station"
              options={checkboxSelectOptions}
              onChange={value => this.checkboxSelectOptionClicked(value)}
            />
          </Box>
          <Box className="col-md-3">
            <Dropdown
              options={WEATHER_OPTIONS}
              onChange={weatherType =>
                this.getWeatherTypeData(weatherType.value, {
                  startDate,
                  endDate,
                })
              }
              label="Select graph"
              value={compareType}
            />
          </Box>
          <Box className="col-md-4">
            <DatePicker
              isOutsideRange={() => false}
              startDate={startDate}
              endDate={endDate}
              onChange={({ startDate, endDate }) => {
                this.setState({
                  startDate,
                  endDate,
                });
                this.getWeatherTypeData(compareType, { startDate, endDate });
              }}
            />
          </Box>
          <Box className="col-md-2">
            <Button
              kind="green"
              size="large"
              width="100%"
              css={`
                display: flex;
                align-items: center;
              `}
              isLoading={buttonLoading}
              onClick={this.exportDataToCsv}
            >
              <Icon name="asset" color="#fff" size={24} />
              Export CSV
            </Button>
          </Box>
        </Box>
        <Box mt="30px">
          {selectedStations.length === 0 ? (
            <Flex alignItems="center" justifyContent="center" py="30vh">
              <Heading>Select weather stations to compare</Heading>
            </Flex>
          ) : loading ? (
            <Flex alignItems="center" justifyContent="center" py="30vh">
              <Spinner />
            </Flex>
          ) : (
            <Card padding="16px">
              <Flex
                alignItems="center"
                justifyContent="space-between"
                mb="16px"
              >
                <Text fontSize="12px">
                  <span style={{ fontWeight: "bold" }}>
                    Weather Station Comparism -
                  </span>
                  <span style={{ fontStyle: "italic" }}>
                    {moment(startDate).format("DD MMM, YYYY hh:mm")} to{" "}
                    {moment(endDate).format("DD MMM, YYYY hh:mm")}
                  </span>
                </Text>
              </Flex>
              <CompareChart
                {...{
                  type: compareType,
                  data,
                  observationTimes,
                }}
              />
            </Card>
          )}
        </Box>

        {error && (
          <Toast
            showToast={error}
            title="Error"
            status="error"
            showCloseButton
            autoClose={false}
            onClose={() => this.setState({ error: false })}
          >
            {errorMessage}
          </Toast>
        )}
      </Box>
    );
  }
}

export default Compare;