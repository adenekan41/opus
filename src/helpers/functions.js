export const convertStringToNumber = string => Number(string);

export const fahrenheitToCelcius = value => {
  value = parseFloat(value);
  return ((value - 32) / 1.8).toFixed(1);
};
