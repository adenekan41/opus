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