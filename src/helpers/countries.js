import sc from 'states-cities-db';

export const countries = sc.getCountries().map(country => ({
  label: country.name,
  value: country.name,
}));

export const getCitites = country =>
  sc.getStates(country).map(city => ({
    label: city.name,
    value: city.name,
  }));
