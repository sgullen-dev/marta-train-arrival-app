import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { apiKey, corsProxyURL, martaArrivalsURL } from './config';
import { updateOptionData } from './utils';
import {
  ArrivalData,
  GetMartaArrivalsResponse,
  MartaArrivalOptionData,
  MartaArrivals,
} from './types';

export const useGetMartaArrivals = () => {
  const config = {
    method: 'get',
    params: { apiKey },
    url: `${corsProxyURL}${martaArrivalsURL}`,
  };
  return useQuery<MartaArrivals, AxiosError>(
    'marta-arrivals',
    () =>
      axios(config).then((res: GetMartaArrivalsResponse) => {
        const arrivals: ArrivalData[] = res.data;

        const destinations: Record<string, MartaArrivalOptionData> = {};
        const lines: Record<string, MartaArrivalOptionData> = {};
        const stations: Record<string, MartaArrivalOptionData> = {};

        arrivals.forEach((arrival) => {
          const { DESTINATION, LINE, STATION } = arrival;

          updateOptionData(destinations, DESTINATION, [LINE, STATION]);
          updateOptionData(lines, LINE, [DESTINATION, STATION]);
          updateOptionData(stations, STATION, [DESTINATION, LINE]);
        });
        return {
          arrivals,
          destinations,
          lines,
          stations,
        };
      }),
    { refetchInterval: 60000 }
  );
};
