import React from "react";
import moment from "moment";
import { Box, Flex, Text, Heading } from "rebass";
import CompareChart from "./CompareChart";
import Breadcrumbs, { BreadcrumbItem } from "../../../components/Breadcrumb";
import Dropdown from "../../../components/Select";
import SingleDatePicker from "../../../components/DatePicker/SingleDatePicker";
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

class Compare extends React.Component {
  state = {
    data: [],
    span:"",
    hours:null,
    days:null,
    loading: false,
    buttonLoading: false,
    compareType: this.props.compareType,
    observationTimes: [],
    date: moment(new Date()),
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
  checkSelectedSpanValue = key => {
    // debugger
    if(key.value.includes('hour')){
      this.setState({
        hours:parseInt(key.value)
      })
    }
    if(key.value.includes('day')){
      this.setState({
        days:parseInt(key.value)
      })
    }
    if(key.value.includes('week')){
      var week = key.value.split("week");
      key = week.splice(0,1).join("");
      key = parseInt(key) * 7
      this.setState({
        days:key
      })
    }
    if(key.value.includes('year')){
      var week = key.value.split("year");
      key.value = week.splice(0,1).join("");
      key.value = parseInt(key.value) * 365
      this.setState({
        days:key.value
      })
    }
    this.setState({
      span: key.value
    })
  }
  compareWeatherStations = () => {
    let { selectedStations, date, compareType, days, hours } = this.state;
    let { actions } = this.props;

    if (date) {
      let { dispatch } = this.props;
      this.setState({ loading: true });
      // let observationTimes = getObservationTimes(date)
      dispatch({
        type: actions.GET_COMPARE_STATION_DATA,
        value: {
          stations: selectedStations,
          start: moment(date).format("M/D/YYYY"),
          type: compareType,
          days,
          hours
        },
      }).then(({ stations }) => {
        this.setState({ loading: false });
        let compareData = this.filterCompareLogByType(compareType, stations);
        this.setState({
          data: compareData,
         
        });
      });
    } else {
      displayDateFilterErrors({ date });
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
      date,
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
        <Box className="row">
          <Box className="col-md-2" mb={2}>
            <CheckboxSelect
              label="Weather Station"
              selected={selectedStations}
              placeholder="Select a station"
              options={checkboxSelectOptions}
              onChange={value => this.checkboxSelectOptionClicked(value)}
            />
          </Box>
          <Box className="col-md-2" mb={2}>
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
          <Box className="col-md-2" mb={2}>
            <SingleDatePicker
              date={date}
              onChange={({ date }) => {
                this.setState({
                  date,
                });
              }}
            />
          </Box>
          <Box className="col-md-2" mb={2}>
             <Dropdown
              options={[{value:"1 hour", label:"1 hour"},{value:"4 hours", label:"4 hours"},{value:"1 day", label:"1 day"},{value:"3 days", label:"3 days"},{value:"1 week", label:"1 week"},{value:"2 weeks", label:"2 weeks"},{value:"1 year", label:"1 year"}]}
              onChange={key =>{
                this.checkSelectedSpanValue(key)
              }}
              label="Span"
              value={this.state.span}
            />
          </Box>
          <Box className="col-md-2" mb={2}>
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
          <Box className="col-md-2" mb={2}>
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
        </Box>

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
                    {moment(date).format("DD MMM, YYYY hh:mm")}
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
