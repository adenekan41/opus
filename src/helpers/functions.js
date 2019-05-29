import moment from "moment";

export const convertStringToNumber = string => (string ? Number(string) : 0);
export const fahrenheitToCelcius = value => {
  if (!!value) {
    value = parseFloat(value);
    return ((value - 32) / 1.8).toFixed(1);
  }
  return null;
};

export const createCSV = text => {
  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(text);
  hiddenElement.target = "_blank";
  hiddenElement.download = "weather_data.csv";
  hiddenElement.click();
};

export const generateCSVFile = data => {
  let csvContent = "data:text/csv;charset=utf-8,";
  let row = "";
  data.forEach(rowArray => {
    rowArray.forEach(item => {
      row = row + JSON.stringify(item);
    });
    csvContent += row + "\r\n";
  });
  csvContent.replace("/[!@#$%^&*]/g", "");
  createCSV(csvContent);
};

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const colors = ["#f42534", "#33475c", "#3589c3", "#29cb98"];

function getStationLabelColor(data) {
  let result = {};
  data
    .map(item => item.station)
    .forEach((element, index) => {
      result[element] = colors[index];
      // result[element] = getRandomColor();
    });
  return result;
}

function generateChartOptions(list) {
  return list.map(({ station, data }) => {
    return {
      label: station,
      backgroundColor: "transparent",
      borderColor: getStationLabelColor(list)[station],
      data,
      borderWidth: 1,
    };
  });
}

const compareChartDataset = {
  Temperature: data => generateChartOptions(data),
  "Current rain": data => generateChartOptions(data),
  "Total rain": data => generateChartOptions(data),
  "Wind speed": data => generateChartOptions(data),
  Humidity: data => generateChartOptions(data),
  "Wind direction": data => generateChartOptions(data),
  Barometer: data => generateChartOptions(data),
};

export const getCompareReportType = (type, data) => {
  if (type) {
    return compareChartDataset[type](data);
  }
};

const reportChartDataset = {
  Temperature: data => [
    {
      label: "Outside Temp",
      backgroundColor: "transparent",
      borderColor: "#f42534",
      data: data[0],
      borderWidth: 1,
    },
    {
      label: "Wind Chill",
      backgroundColor: "transparent",
      borderColor: "#29cb58",
      data: data[1],
      borderWidth: 1,
    },
    {
      label: "Dew Point",
      backgroundColor: "transparent",
      borderColor: "#221e20",
      data: data[2],
      borderWidth: 1,
    },
    {
      label: "Heat Index",
      backgroundColor: "transparent",
      borderColor: "#3188c2",
      data: data[3],
      borderWidth: 1,
    },
  ],
  "Current rain": data => [
    {
      label: "Rain Day",
      backgroundColor: "transparent",
      borderColor: "#29cb58",
      data: data[0],
      borderWidth: 1,
    },
    {
      label: "Rain Storm",
      backgroundColor: "transparent",
      borderColor: "#34485e",
      data: data[1],
      borderWidth: 1,
    },
  ],
  "Total rain": data => [
    {
      label: "Rain Month",
      backgroundColor: "transparent",
      borderColor: "#29cb58",
      data: data[0],
      borderWidth: 1,
    },
    {
      label: "Rain Year",
      backgroundColor: "transparent",
      borderColor: "#34485e",
      data: data[1],
      borderWidth: 1,
    },
  ],
  "Wind speed": data => [
    {
      label: "Wind Speed",
      backgroundColor: "transparent",
      borderColor: "#221e20",
      data: data[0],
      borderWidth: 1,
    },
  ],
  Humidity: data => [
    {
      label: "Humidity",
      backgroundColor: "transparent",
      borderColor: "#3188c2",
      data: data[0],
      borderWidth: 1,
    },
  ],
  "Wind direction": data => [
    {
      label: "Wind Direction",
      backgroundColor: "transparent",
      borderColor: "#34485e",
      data: data[0],
      borderWidth: 1,
    },
  ],
  Barometer: data => [
    {
      label: "Pressure",
      backgroundColor: "transparent",
      borderColor: "#29cb58",
      data: data[0],
      borderWidth: 1,
    },
  ],
};

export const getWeatherReportType = (type, data) => {
  if (type) {
    return reportChartDataset[type](data);
  }
};

export const weatherTypeData = {
  Temperature: ["temp_c", "wind_chill_c", "dew_point_c", "heat_index_c"],
  "Current rain": ["rain_rate_mm_h", "rain_rate_mm_h"],
  "Total rain": ["rain_mm", "rain_mm"],
  "Wind speed": ["wind_speed_m_s"],
  Humidity: ["hum_%"],
  // "Wind direction": ["wind_degrees"],
  Barometer: ["barometer_hpa"],
};

export const compareTypeData = {
  Temperature: ["temp_c"],
  "Current rain": ["rain_rate_mm_h"],
  "Total rain": ["rain_mm", "rain_mm"],
  "Wind speed": ["wind_speed_m_s"],
  Humidity: ["hum_%"],
  // "Wind direction": ["wind_degrees"],
  Barometer: ["barometer_hpa"],
};

export const formatDate = (date, format) => {
  return moment(date).format(format);
};

export const getDatesForFilter = ({ startDate, endDate }) => {
  let today = new Date();
  let todayInSeconds = convertStringToNumber(formatDate(today, "X"));
  let startDateInSeconds = convertStringToNumber(formatDate(startDate, "X"));
  let endDateInSeconds = convertStringToNumber(formatDate(endDate, "X"));
  return { todayInSeconds, startDateInSeconds, endDateInSeconds };
};

export const getValue = (value, unit = "") => {
  if(value === "--") {
    return "--"
  }
  if (value) {
    return `${value} ${unit}`;
  }
  return "--";
};

export const valueInDecimal = value => {
  if (!!value) {
    return parseFloat(value).toFixed(1);
  }
};
