import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Box, Flex, Text, Heading } from "rebass";
import CompareChart from "./CompareChart";
import Breadcrumbs, { BreadcrumbItem } from "../../../components/Breadcrumb";
import Dropdown from "../../../components/Select";
import DatePicker from "../../../components/DatePicker";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import CheckboxSelect from "../../../components/CheckboxSelect";
import { Icon } from "../../../components/Icon";
import {
  WEATHER_OPTIONS,
  labelStringRegister,
} from "../../../helpers/constants";
import {
  createCSV,
  displayDateFilterErrors,
  getCompareReportType,
  arrayDataIsEmpty,
  compareTypeData,
  getObservationTimes,
} from "../../../helpers/functions";
import { Spinner } from "../../../components/Spinner";
import toaster from "../../../components/Toaster";

const CompareFiltersSection = styled(Flex)`
  .filter-section-item {
    padding-right: 12px;
  }

  .stations {
    width: 18%;
  }

  .weather-type {
    width: 20%;
  }

  .date-range {
    width: 30%;
  }

  .compare-button {
    width: 15%;
  }

  .export-button {
    width: 17%;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .filter-section-item {
      padding-right: 0;
      width: 100%;
    }
  }
`;

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
  };

  componentDidMount() {
    const { dispatch, actions } = this.props;
    dispatch({
      type: actions.CLEAR_COMPARE_LOGS,
    });
  }

  exportDataToCsv = () => {
    const { dispatch, actions } = this.props;
    const { selectedStations, startDate, endDate, compareType } = this.state;

    this.setState({ buttonLoading: true });

    dispatch({
      type: actions.EXPORT_COMPARE_DATA_CSV,
      value: {
        station_names: selectedStations,
        weather_type: compareType,
        start_date: moment(startDate).format("M/D/YYYY"),
        end_date: moment(endDate).format("M/D/YYYY"),
      },
    })
      .then(data => {
        this.setState({ buttonLoading: false });
        createCSV(data);
      })
      .catch(() => {
        this.setState({
          buttonLoading: false,
        });
        toaster.error("Unable to export data. Please try again.");
      });
  };

  compareWeatherStations = () => {
    let { selectedStations, startDate, endDate, compareType } = this.state;
    let { actions } = this.props;

    if (startDate && endDate) {
      let { dispatch } = this.props;
      this.setState({ loading: true });
      let observationTimes = getObservationTimes(startDate, endDate);
      dispatch({
        type: actions.GET_COMPARE_STATION_DATA,
        value: {
          station_names: selectedStations,
          start_date: moment(startDate).format("M/D/YYYY"),
          end_date: moment(endDate).format("M/D/YYYY"),
          weather_type: compareType,
        },
      }).then(({ stations }) => {
        this.setState({ loading: false });
        let compareData = this.filterCompareLogByType(compareType, stations);
        this.setState({
          data: compareData,
          observationTimes,
        });
      });
    } else {
      displayDateFilterErrors({ startDate, endDate });
    }
  };

  filterCompareLogByType = (type, data) => {
    if (type) {
      let result = [];
      compareTypeData[type].forEach(item => {
        result = data
          ? data.map(({ station, data }) => ({
              station,
              data: data.map(value => value[item]),
            }))
          : [];
      });
      return result;
    } else {
      toaster.error("Please select weather type to compare");
    }
  };

  checkboxSelectOptionClicked = station => {
    let { selectedStations } = this.state;

    if (selectedStations.includes(station)) {
      this.setState(({ selectedStations, data }) => ({
        selectedStations: selectedStations.filter(item => item !== station),
        data: data.filter(item => item.station !== station),
      }));
    } else {
      this.setState(({ selectedStations }) => ({
        selectedStations: [station, ...selectedStations],
      }));
    }
  };

  render() {
    const { weatherStations } = this.props;
    let {
      data,
      endDate,
      loading,
      startDate,
      buttonLoading,
      observationTimes,
      selectedStations,
    } = this.state;
    let checkboxSelectOptions = weatherStations.map(station => ({
      label: station.station_name,
      value: station.station_name,
    }));
    let labelString = labelStringRegister[this.state.compareType];
    let graphData = getCompareReportType(this.state.compareType, data);

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
        <CompareFiltersSection alignItems="center" flexWrap="wrap">
          <Box mb={2} className="filter-section-item stations">
            <CheckboxSelect
              label="Weather Station"
              selected={selectedStations}
              placeholder="Select a station"
              options={checkboxSelectOptions}
              onChange={value => this.checkboxSelectOptionClicked(value)}
            />
          </Box>
          <Box mb={2} className="filter-section-item weather-type">
            <Dropdown
              options={WEATHER_OPTIONS}
              onChange={weatherType =>
                this.setState({
                  compareType: weatherType.value,
                })
              }
              label="Select graph"
              value={this.state.compareType}
            />
          </Box>
          <Box mb={2} className="filter-section-item date-range">
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              onChange={({ startDate, endDate }) => {
                this.setState({
                  startDate,
                  endDate,
                });
              }}
            />
          </Box>
          <Box mb={2} className="filter-section-item compare-button">
            <Button
              block
              kind="green"
              size="large"
              css={`
                display: flex;
                align-items: center;
              `}
              disabled={selectedStations.length < 2 || loading}
              onClick={this.compareWeatherStations}
            >
              Compare
            </Button>
          </Box>
          <Box mb={2} className="filter-section-item export-button">
            <Button
              kind="green"
              size="large"
              width="100%"
              css={`
                display: flex;
                align-items: center;
              `}
              disabled={arrayDataIsEmpty(data) || loading}
              isLoading={buttonLoading}
              onClick={this.exportDataToCsv}
            >
              <Icon name="asset" color="#fff" size={24} />
              Export CSV
            </Button>
          </Box>
        </CompareFiltersSection>

        <Box mt="30px">
          {selectedStations.length < 2 ? (
            <Flex alignItems="center" justifyContent="center" py="30vh">
              <Heading>
                Select at least two weather stations and click the compare
                button
              </Heading>
            </Flex>
          ) : loading ? (
            <Flex alignItems="center" justifyContent="center" py="30vh">
              <Spinner />
            </Flex>
          ) : !arrayDataIsEmpty(data) ? (
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
                  data: graphData.filter(i => i.data),
                  labelString,
                  observationTimes,
                }}
              />
            </Card>
          ) : (
            <Flex alignItems="center" justifyContent="center" py="30vh">
              <Heading>No data</Heading>
            </Flex>
          )}
        </Box>
      </Box>
    );
  }
}

export default Compare;
