import csc from "country-state-city";

export const allCountries = csc.getAllCountries()

export const countries = csc.getAllCountries().map(country => ({
  label: country.name,
  value: country.name,
}));

export const getCountryStates = countryId =>
  csc.getStatesOfCountry(countryId).map(states => ({
    label: states.name,
    value: states.name,
  }));

export const getStateCities = stateId =>
  csc.getCitiesOfState(stateId).map(city => ({
    label: city.name,
    value: city.name,
  }));
