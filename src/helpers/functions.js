import moment from "moment";
import toaster from "../components/Toaster";
import { allCountries } from "./countries";

export function decodeJwt(token) {
  var base64Url = token && token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export function hasExpired(token) {
  let { exp, ...rest } = decodeJwt(token);
  return Date.now() > new Date(exp * 1000);
}

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
  var date = moment(new Date()).format("YY/MM/DD/HH:mm");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(text);
  hiddenElement.target = "_blank";
  hiddenElement.download = `${date}_weather_data.csv`;
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

// const colors = ["#f42534", "#33475c", "#3589c3", "#29cb98"];

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getStationLabelColor(data) {
  let result = {};
  data
    .map(item => item.station)
    .forEach((element, index) => {
      // result[element] = colors[index];
      result[element] = getRandomColor();
    });
  return result;
}

function generateChartOptions(list) {
  return list.map(({ station, data }) => {
    if (arrayDataIsNull(data)) {
      return {
        label: station,
        backgroundColor: "transparent",
        borderColor: getStationLabelColor(list)[station],
        data: null,
        borderWidth: 1,
      };
    }
    return {
      label: station,
      backgroundColor: "transparent",
      borderColor: getStationLabelColor(list)[station],
      data: data.map(item => (item ? item : 0)),
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
  "Total rain": ["rain_month", "rain_year"],
  "Wind speed": ["wind_speed_m_s"],
  Humidity: ["hum_%"],
  "Wind direction": ["wind_degrees"],
  Barometer: ["barometer_hpa"],
};

export const compareTypeData = {
  Temperature: ["Temp°C"],
  "Current rain": ["rain_rate"],
  "Total rain": ["rain_month"],
  "Wind speed": ["wind_peed"],
  Humidity: ["current_humidity"],
  "Wind direction": ["wind_degrees"],
  Barometer: ["barometer_pressure"],
};

export const formatDate = (date, format) => {
  return moment(date).format(format);
};

export const displayDateFilterErrors = ({ startDate, endDate }) => {
  if (startDate && !endDate) {
    toaster.error("Please select end date");
  }
  if (!startDate && endDate) {
    toaster.error("Please select start date");
  }
};

export const getDatesForFilter = ({ startDate, endDate }) => {
  let today = new Date();
  let todayInSeconds = convertStringToNumber(formatDate(today, "X"));
  let startDateInSeconds = convertStringToNumber(formatDate(startDate, "X"));
  let endDateInSeconds = convertStringToNumber(formatDate(endDate, "X"));
  return { todayInSeconds, startDateInSeconds, endDateInSeconds };
};

export const getValue = (value, unit = "") => {
  if (value === "--") {
    return "--";
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

export const getBase64Url = (file, callback) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    file = reader.result;
    callback(file);
  };
};

export const setProfilePicture = data => {
  if (data === "null") {
    return "";
  }
  if (!data) {
    return "";
  }
  return data;
};

export const getApiErrors = errors => {
  const result = [];
  if(typeof errors === "string") {
    return errors;
  }
  errors &&
    Object.keys(errors).length > 0 &&
    Object.keys(errors).forEach(key => {
      result.push(errors[key]);
    });
  return result;
};

export const errorCallback = (error, setApiResponse) => {
  const errorPayload = error && error.response && error.response.data;
  if (errorPayload && errorPayload.detail) {
    toaster.error(errorPayload && errorPayload.detail);
  } else {
    setApiResponse && setApiResponse(errorPayload);
    toaster.error("Wrong parameters");
  }
};

export const getStates = (country, countries) => {
  const selectedCountry = countries.find(c => c.value === country);
  const data =
    selectedCountry && selectedCountry.label ? selectedCountry.label : "";
  const result = allCountries.find(
    c => c.name.toLowerCase() === data.toLowerCase()
  );
  return result ? result.id : "";
};

export const getUserWeatherStations = (
  userWeatherStations,
  weatherStations
) => {
  let weatherLinkStations = weatherStations;
  let userWeatherStationNames = userWeatherStations.map(s => s.station_name);
  return weatherLinkStations.filter(station =>
    userWeatherStationNames.includes(station.station_name)
  );
};

export const arrayDataIsNull = data => {
  return data.every(item => item === null);
};

export const arrayDataIsEmpty = data => {
  return data.map(i => i.data).every(arrayDataIsNull);
};

export const getObservationTimes = (startDate, endDate ) => {
  let diff = endDate.diff(startDate, "hours");
  let observationTimes = [];
  for(let i=0; i<diff; i++ ) {
    observationTimes.push(moment(startDate).add(i, "hours"));
  }
  return observationTimes.map(item => item.format("DD/MM HH:mm"));
}

export function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var queryString = url ? url.split("?")[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split("#")[0];

    // split our query string into its component parts
    var arr = queryString.split("&");

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split("=");

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1, -1);
        return "";
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof a[1] === "undefined" ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === "string") {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === "undefined") {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}
