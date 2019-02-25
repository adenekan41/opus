import { createContext } from 'react';
export const DataContext = createContext({
  state: {},
  updateState: () => {},
  dispatch: () => {},
  actions: {},
  selectors: () => {},
});
