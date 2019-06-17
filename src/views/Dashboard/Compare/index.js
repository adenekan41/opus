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
    compareType: this.props.compareType,
    observationTimes: [],
    endDate: moment(new Date()),
    startDate: moment(new Date()).subtract(1, "days"),
    selectedStations: [],
    error: false,
    errorMessage: "",
  };

  componentDidMount() {
    const { dispatch, actions } = this.props;
    dispatch({
      type: actions.CLEAR_COMPARE_LOGS
    })
  }
  
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
    const { dispatch, actions } = this.props;
    const { selectedStations, startDate, endDate, compareType } = this.state;

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
    let { dispatch } = this.props;
    dispatch({
      type: actionType,
      value: station,
    }).then(() => {
      this.setState({ loading: false });
      this.getWeatherTypeData(this.state.compareType, {
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
        ({ selectedStations, data }) => ({
          selectedStations: selectedStations.filter(item => item !== station),
          data: data.filter(item => item.station !== station),
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
    const { weatherStations } = this.props;
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
          <Box className="col-md-3" mb={2}>
            <CheckboxSelect
              label="Weather Station"
              selected={selectedStations}
              placeholder="Select a station"
              options={checkboxSelectOptions}
              onChange={value => this.checkboxSelectOptionClicked(value)}
            />
          </Box>
          <Box className="col-md-3" mb={2}>
            <Dropdown
              options={WEATHER_OPTIONS}
              onChange={weatherType =>
                this.setState(
                  {
                    compareType: weatherType.value,
                  },
                  () => {
                    this.getWeatherTypeData(weatherType.value, {
                      startDate,
                      endDate,
                      station: selectedStations[0]
                    });
                  }
                )
              }
              label="Select graph"
              value={this.state.compareType}
            />
          </Box>
          <Box className="col-md-4" mb={2}>
            <DatePicker
              isOutsideRange={() => false}
              startDate={startDate}
              endDate={endDate}
              onChange={({ startDate, endDate }) => {
                this.setState({
                  startDate,
                  endDate,
                });
                this.getWeatherTypeData(this.state.compareType, {
                  startDate,
                  endDate,
                  station: selectedStations[0]
                });
              }}
            />
          </Box>
          <Box className="col-md-2" mb={2}>
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
          ) : data.length > 0 ? (
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
                  type: this.state.compareType,
                  data,
                  observationTimes,
                }}
              />
            </Card>
          ) : (
            <Flex alignItems="center" justifyContent="center" py="30vh">
              <Heading>No data for weather station</Heading>
            </Flex>
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
