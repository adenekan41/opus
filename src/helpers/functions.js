export const convertStringToNumber = string => Number(string);

export const fahrenheitToCelcius = value => {
  value = parseFloat(value);
  return ((value - 32) / 1.8).toFixed(1);
};

export const createCSV = text => {
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(text);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'weather_data.csv';
  hiddenElement.click();
};

const reportTypes = {
  Temperature: data => [
    {
      label: 'Temp',
      backgroundColor: 'transparent',
      borderColor: '#f42534',
      data: data[0],
      borderWidth: 1
    },
    {
      label: 'Low Temp',
      backgroundColor: 'transparent',
      borderColor: '#34485e',
      data: data[1],
      borderWidth: 1
    },
    {
      label: 'Dew Point',
      backgroundColor: 'transparent',
      borderColor: '#221e20',
      data: data[2],
      borderWidth: 1
    },
    {
      label: 'Wind Chill',
      backgroundColor: 'transparent',
      borderColor: '#3188c2',
      data: data[3],
      borderWidth: 1
    },
  ],
  'Current rain': data => [
    {
      label: 'Rain Day',
      backgroundColor: 'transparent',
      borderColor: '#221e20',
      data: data[0],
      borderWidth: 1
    },
    {
      label: 'Rain Storm',
      backgroundColor: 'transparent',
      borderColor: '#34485e',
      data: data[1],
      borderWidth: 1
    },
  ],
  'Total rain': data => [
    {
      label: 'Rain Month',
      backgroundColor: 'transparent',
      borderColor: '#221e20',
      data: data[0],
      borderWidth: 1
    },
    {
      label: 'Rain Year',
      backgroundColor: 'transparent',
      borderColor: '#34485e',
      data: data[1],
      borderWidth: 1
    },
  ],
  'Wind speed': data => [
    {
      label: 'Wind Speed',
      backgroundColor: 'transparent',
      borderColor: '#221e20',
      data: data[0],
      borderWidth: 1
    },
  ],
  Humidity: data => [
    {
      label: 'Humidity',
      backgroundColor: 'transparent',
      borderColor: '#3188c2',
      data: data[0],
      borderWidth: 1
    },
  ],
  'Wind direction': data => [
    {
      label: 'Wind Direction',
      backgroundColor: 'transparent',
      borderColor: '#34485e',
      data: data[0],
      borderWidth: 1
    },
  ],
  Barometer: data => [
    {
      label: 'Pressure',
      backgroundColor: 'transparent',
      borderColor: '#221e20',
      data: data[0],
      borderWidth: 1
    },
  ],
};

export const getWeatherReportType = (type, data) => {
  if (type) {
    return reportTypes[type](data);
  }
};

export const weatherTypeData = {
  Temperature: ['outside_temp', 'windchill', 'dewpoint', 'heat_index'],
  'Current rain': ['rain_day_in', 'rain_storm'],
  'Total rain': ['rain_month', 'rain_year'],
  'Wind speed': ['wind_speed'],
  Humidity: ['current_humidity'],
  'Wind direction': ['wind_degrees'],
  Barometer: ['pressure_in'],
};
