import React, { Component } from "react";
import { Flex, Box, Heading } from "rebass";
import moment from "moment";
import DatePicker from "../../../components/DatePicker";
import Button from "../../../components/Button";
import { Icon } from "../../../components/Icon";
import Table from "../../../components/Table";
import {
  createCSV,
  getValue,
  valueInDecimal,
} from "../../../helpers/functions";
import { Toast } from "../../../components/Toast";

const ForecastTableColumns = [
  {
    Header: "Time",
    id: "time",
    accessor: "time",
    Cell: ({ original: { time } }) => (
      <span>{moment(time).format("DD/MM/YY - hh:mm")}</span>
    ),
    fixed: "left",
    style: {
      color: "#ffffff",
      backgroundColor: "#3c464c",
    },
    width: 120,
  },
  {
    Header: "Barometer",
    id: "barometer",
    Cell: ({ original: { barometer } }) => {
      return <span>{getValue(valueInDecimal(barometer), "hPa")}</span>;
    },
    width: 120,
  },
  {
    Header: "Temperature",
    style: {
      backgroundColor: "#f4f4f4",
    },
    Cell: ({ original: { temperature } }) => (
      <span>{getValue(temperature, "°C")}</span>
    ),
    width: 120,
  },
  {
    Header: "High Temp.",
    id: "High Temperature",
    style: {
      backgroundColor: "#f4f4f4",
    },
    Cell: ({ original: { high_temperature } }) => (
      <span>{getValue(high_temperature, `°C`)}</span>
    ),
    width: 120,
  },
  {
    Header: "Low Temp.",
    id: "Low Temp",
    style: {
      backgroundColor: "#f4f4f4",
    },
    Cell: ({ original: { low_temperature } }) => (
      <span>{getValue(low_temperature, "°C")}</span>
    ),
    width: 120,
  },
  {
    Header: "Humidity",
    id: "Humidity",
    Cell: ({ original: { humidity } }) => (
      <span>{getValue(humidity, "%")}</span>
    ),
    width: 120,
  },
  {
    Header: "Dew Point",
    id: "Dew Point",
    Cell: ({ original: { dewpoint } }) => (
      <span>{getValue(dewpoint, "°C")}</span>
    ),
    width: 120,
  },
  {
    Header: "Wet Bulb",
    id: "Wet Bulb",
    Cell: ({ original: { wetbulb } }) => <span>{getValue(wetbulb, "°C")}</span>,
    width: 120,
  },
  {
    Header: "Wind Speed",
    id: "Wind Speed",
    style: {
      backgroundColor: "#f4f4f4",
    },
    Cell: ({ original: { wind_speed } }) => (
      <span>{getValue(wind_speed, "m/s")}</span>
    ),
    width: 120,
  },
  {
    Header: "Wind Direction",
    style: {
      backgroundColor: "#f4f4f4",
    },
    Cell: ({ original: { wind_direction } }) => (
      <span>{getValue(wind_direction)}</span>
    ),
    width: 140,
  },
  {
    Header: "Wind Run",
    style: {
      backgroundColor: "#f4f4f4",
    },
    Cell: ({ original: { wind_run } }) => (
      <span>{getValue(wind_run, "m")}</span>
    ),
    width: 120,
  },
  {
    Header: "High Wind Speed",
    style: {
      backgroundColor: "#f4f4f4",
    },
    Cell: ({ original: { high_wind_speed } }) => (
      <span>{getValue(high_wind_speed, "m/s")}</span>
    ),
    width: 180,
  },
  {
    Header: "High Wind Direction",
    style: {
      backgroundColor: "#f4f4f4",
    },
    Cell: ({ original: { high_wind_direction } }) => (
      <span>{getValue(high_wind_direction)}</span>
    ),
    width: 180,
  },
  {
    Header: "Wind Chill",
    id: "windchill",
    Cell: ({ original: { windchill } }) => (
      <span>{getValue(windchill, "°C")}</span>
    ),
    style: {
      backgroundColor: "#f4f4f4",
    },
    width: 120,
  },
  {
    Header: "Heat Index",
    id: "heat_index",
    Cell: ({ original: { heat_index } }) => (
      <span>{getValue(heat_index, "°C")}</span>
    ),
    style: {
      backgroundColor: "#f4f4f4",
    },
    width: 120,
  },
  {
    Header: "THW Index",
    id: "thw_index",
    Cell: ({ original: { thw_index } }) => (
      <span>{getValue(thw_index, "°C")}</span>
    ),
    style: {
      backgroundColor: "#f4f4f4",
    },
    width: 120,
  },
  {
    Header: "Rain",
    id: "Rain",
    Cell: ({ original: { rain } }) => (
      <span>{getValue(valueInDecimal(rain, "mm"))}</span>
    ),
    width: 120,
  },
  {
    Header: "Rain Rate",
    id: "Rain Rate",
    Cell: ({ original: { rain_rate } }) => (
      <span>{getValue(valueInDecimal(rain_rate, "mm/h"))}</span>
    ),
    width: 120,
  },
  {
    Header: "ET",
    id: "ET",
    Cell: ({ original: { et } }) => <span>{getValue(et, "mm")}</span>,
    width: 120,
  },
  {
    Header: "Heating Degree Days",
    id: "Heating Degree Days",
    Cell: ({ original: { heating_degree_days } }) => (
      <span>{getValue(heating_degree_days)}</span>
    ),
    width: 120,
  },
  {
    Header: "Cooling Degree Days",
    id: "Cooling Degree Days",
    Cell: ({ original: { cooling_degree_days } }) => (
      <span>{getValue(cooling_degree_days)}</span>
    ),
    width: 120,
  },
];

export default class ForecastTable extends Component {
  state = {
    error: false,
    loading: false,
    errorMessage: "",
    endDate: moment(new Date()),
    startDate: moment(new Date()),
    weatherStationLogs: this.props.weatherStationLogs || [],
  };

  componentDidMount() {
    const { weatherStation, history } = this.props;
    if (Object.values(weatherStation).length === 0) {
      history.push("/dashboard/weather-data/map");
    }
  }

  getSingleDataPoint = weatherStation => {
    const {
      observation_time,
      barometer_hpa,
      temp_c,
      high_temp_c,
      low_temp_c,
      dew_point_c,
      wet_bulb_c,
      wind_speed_m_s,
      wind_direction,
      wind_run_m,
      high_wind_speed_m_s,
      high_wind_direction,
      wind_chill_c,
      heat_index_c,
      thw_index_c,
      rain_mm,
      rain_rate_mm_h,
      et_mm,
      heating_degree_days,
      cooling_degree_days,
      wind_chill_low_c,
      wind_chill_high_c,
      heat_index_low_c,
      heat_index_high_c,
      dew_point_low_c,
      dew_point_high_c,
      ...rest
    } = weatherStation;

    return {
      temperature: temp_c,
      high_temperature: high_temp_c,
      low_temperature: low_temp_c,
      dewpoint: dew_point_c,
      wetbulb: wet_bulb_c,
      wind_speed: wind_speed_m_s,
      wind_direction,
      wind_run: wind_run_m,
      high_wind_speed: high_wind_speed_m_s,
      high_wind_direction,
      wind_chill: wind_chill_c,
      heat_index: heat_index_c,
      thw_index: thw_index_c,
      rain: rain_mm,
      rain_rate: rain_rate_mm_h,
      et: et_mm,
      heating_degree_days,
      cooling_degree_days,
      low_wind_chill: wind_chill_low_c,
      high_wind_chill: wind_chill_high_c,
      low_heat_index: heat_index_low_c,
      high_heat_index: heat_index_high_c,
      low_dew_point: dew_point_low_c,
      high_dew_point: dew_point_high_c,
      barometer: barometer_hpa,
      time: observation_time,
      humidity: rest["hum_%"],
      low_humidity: rest["hum_low_%"],
      high_humidity: rest["hum_high_%"],
    };
  };

  getTableData = () => {
    const { weatherStationLogs } = this.state;
    return weatherStationLogs.map(this.getSingleDataPoint);
  };

  exportWeatherData = () => {
    const { dispatch, actions, weatherStation } = this.props;
    const { startDate, endDate } = this.state;

    this.setState({ loading: true, error: false, errorMessage: "" });

    dispatch({
      type: actions.EXPORT_WEATHER_DATA,
      value: {
        station_name: weatherStation.station_name,
        start_date: startDate,
        end_date: endDate,
      },
    })
      .then(data => {
        this.setState({ loading: false });
        createCSV(data);
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
          errorMessage: "Unable to export data. Please try again.",
        });
      });
  };

  filterDataByDate = dates => {
    const { dispatch, actions } = this.props;
    let data = dispatch({
      type: actions.FILTER_WEATHER_DATA_BY_DATE,
      value: dates,
    });
    this.setState({
      weatherStationLogs: data,
    });
  };

  render() {
    let data = this.getTableData();
    let { error, errorMessage } = this.state;
    return (
      <Box mt="32px">
        <Flex flexWrap="wrap">
          <Box width="350px" mr="20px">
            <DatePicker
              isOutsideRange={() => false}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={({ startDate, endDate }) => {
                this.setState(
                  {
                    startDate,
                    endDate,
                  },
                  () => this.filterDataByDate({ startDate, endDate })
                );
              }}
            />
          </Box>
          <Box width="200px">
            <Button
              kind="green"
              size="large"
              width="100%"
              css={`
                display: flex;
                align-items: center;
              `}
              isLoading={this.state.loading}
              onClick={this.exportWeatherData}
            >
              <Icon name="asset" color="#fff" size={24} />
              Export CSV
            </Button>
          </Box>
        </Flex>
        <Box mt="40px">
          {data.length > 0 ? (
            <Table
              data={data}
              showPagination={data.length > 20}
              noDataText="No Weather Data"
              columns={ForecastTableColumns}
              style={{ height: 500 }}
            />
          ) : (
            <Flex alignItems="center" justifyContent="center" py="30vh">
              <Heading>No Weather Data For Selected Date Range</Heading>
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
