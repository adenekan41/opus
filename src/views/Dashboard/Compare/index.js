import React from 'react';
import moment from 'moment';
import { Box, Flex, Text } from 'rebass';
import Breadcrumbs, { BreadcrumbItem } from '../../../components/Breadcrumb';
import Dropdown from '../../../components/Select';
import DatePicker from '../../../components/DatePicker';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import { Icon } from '../../../components/Icon';
import CheckboxSelect from '../../../components/CheckboxSelect';
import { WEATHER_OPTIONS } from '../../../helpers/constants';
import CompareChart from './CompareChart';
import { createCSV, generateCSVFile } from '../../../helpers/functions';
import { Spinner } from '../../../components/Spinner';

class Compare extends React.Component {
  state = {
    data: [],
    loading: false,
    buttonLoading: false,
    observationTimes: [],
    endDate: moment(new Date()),
    startDate: moment(new Date()).subtract(1, 'day')._d,
    selectedStations: ['SEFWI01'],
  };

  componentDidMount() {
    const { actions } = this.props;
    this.setState({ loading: true });
    this.utilityCallback({
      actionType: actions.GET_COMPARE_STATION_DATA,
      startDate: moment(new Date()).subtract(1, 'day')._d,
      endDate: new Date(),
    });
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
    const { dispatch, actions, compareStationCsvData } = this.props;
    let data = compareStationCsvData.map(value => value.data);
    generateCSVFile(data);

    // dispatch({ type: actions.EXPORT_WEATHER_DATA }).then(data => {
    //   this.setState({ buttonLoading: false });
    //   generateCSVFile(data);
    // });
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
          //make call to get stations data
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
          //make call to get stations data
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
      endDate,
      loading,
      startDate,
      buttonLoading,
      observationTimes,
      selectedStations,
    } = this.state;
    let checkboxSelectOptions = weatherStations.map(station => ({
      label: station.location,
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
          <Card padding="16px">
            <Flex alignItems="center" justifyContent="space-between" mb="16px">
              <Text fontSize="12px">
                <span style={{ fontWeight: 'bold' }}>
                  Weather Station Comparism -
                </span>
                <span style={{ fontStyle: 'italic' }}>
                  {moment(startDate).format('DD MMM, YYYY hh:mm')} to{' '}
                  {moment(endDate).format('DD MMM, YYYY hh:mm')}
                </span>
              </Text>
            </Flex>
            {loading ? (
              <Flex alignItems="center" justifyContent="center">
                <Spinner />
              </Flex>
            ) : (
              <CompareChart
                {...{
                  type: compareType,
                  data,
                  observationTimes,
                }}
              />
            )}
          </Card>
        </Box>
      </Box>
    );
  }
}

export default Compare;
