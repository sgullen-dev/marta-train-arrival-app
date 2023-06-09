## Welcome to the MARTA train arrivals tracker

The Metropolitan Atlanta Rapid Transit Authority (MARTA) is the primary public transport operator in Atlanta. This app allows users to see upcoming train arrivals for train stations, and supports filtering by the final destination of the line, the line color, or the next station on its route.

[CodeSandbox](https://codesandbox.io/s/marta-train-arrival-app-jsyb3u)

## Developer Notes

- React application bootstrapped with Create-React-App

- Written in TypeScript with Material-UI and styled components

- react-query and Axios for api hooks and polling (1 minute intervals)

### QOL features

- Contextually disabling filter values based on other selections (ex: if you pick red line, only allows selecting stations on the red line)

- Responsive down to phone screen size
