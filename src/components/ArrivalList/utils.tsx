import { ArrivalData as Arrival } from '../../api/types';
import { ArrivalFiltersFormData as Filters } from '../ArrivalFiltersForm/arrival-filters-form.data';

const matchDestination = (filters: Filters, arrival: Arrival): boolean =>
  !filters?.destination || filters.destination === arrival.DESTINATION;

const matchLine = (filters: Filters, arrival: Arrival): boolean =>
  !filters?.line || filters.line === arrival.LINE;

const matchStation = (filters: Filters, arrival: Arrival): boolean =>
  !filters?.station || filters.station === arrival.STATION;

export const filterArrivals = (arrivals: Arrival[], filters: Filters): Arrival[] =>
  arrivals.filter(
    (arrival: Arrival) =>
      matchDestination(filters, arrival) &&
      matchLine(filters, arrival) &&
      matchStation(filters, arrival)
  );

export const sortByWaitingSeconds = (arrivals: Arrival[]): Arrival[] =>
  arrivals.sort((a, b) => parseFloat(a.WAITING_SECONDS) - parseFloat(b.WAITING_SECONDS));
