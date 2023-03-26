// React
import React, { useEffect, useMemo, useState } from 'react';
// Material UI
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
// Internal
import { ArrivalFiltersFormData as FilterData } from '../ArrivalFiltersForm/arrival-filters-form.data';
import { MartaArrivals } from '../../api/types';
import { ArrivalDetailAvatar } from './components/arrival-detail-avatar';
import { ArrivalDetailText } from './components/arrival-detail-text';
import { filterArrivals, sortByWaitingSeconds } from './utils';
import { FilterDetailText } from './components/filter-detail-text';
import { itemsPerPage, showPageItem } from '../../utils/pagination-utils';

const ArrivalsPaper = styled(Paper)(({ theme }) => ({
  padding: '8px',
  // @ts-ignore : Custom breakpoints not working with typescript in codesandbox
  [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
    padding: 0,
  },
}));

const PaginationWrapper = styled(Box)(({ theme }) => ({
  justifyContent: 'end',
  display: 'flex',
  padding: '10px 0',
  '& .MuiPaginationItem-firstLast': {
    display: 'none',
  },
  // @ts-ignore : Custom breakpoints not working with typescript in codesandbox
  [theme.breakpoints.down(theme.breakpoints.values.xsMobile)]: {
    '& .MuiPaginationItem-firstLast': {
      display: 'inline-flex',
    },
    '& button, & .MuiPaginationItem-ellipsis': {
      display: 'none',
    },
    '& .Mui-selected, & .MuiPaginationItem-previousNext': {
      display: 'inline-flex',
    },
  },
}));

interface ArrivalListProps {
  data: MartaArrivals;
  filters: FilterData;
}

/**
 * Component for displaying a list of train arrivals based on filters
 * @param data Arrivals list data
 * @param filters Arrivals filters
 */
export const ArrivalList = ({
  data: { arrivals = [], stations = {}, destinations = {} },
  filters,
}: ArrivalListProps) => {
  const [page, setPage] = useState<number>(1);

  // Filter the arrivals based on the selected filter values and sort by arrival time
  const displayedArrivals = useMemo(() => {
    const filteredArrivals = filterArrivals(arrivals, filters);
    return sortByWaitingSeconds(filteredArrivals);
  }, [arrivals, filters]);

  // Calculate the number of pages based on the displayed arrivals
  const numPages = useMemo(() => {
    if (!displayedArrivals.length) return 1;
    return Math.ceil(displayedArrivals.length / itemsPerPage);
  }, [displayedArrivals]);

  // Hook for verifying the current page number is within the range of pages
  useEffect(() => {
    if (page > numPages) setPage(numPages);
  }, [page, numPages]);

  // Function for handling arrivals list page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // View for no arrivals matching filter values
  if (!displayedArrivals.length) {
    return (
      <ArrivalsPaper elevation={2}>
        <FilterDetailText>No arrivals match filters</FilterDetailText>
      </ArrivalsPaper>
    );
  }

  return (
    <ArrivalsPaper elevation={2}>
      <>
        <List sx={{ padding: '4px 0' }}>
          {displayedArrivals.map((arrival, index) => {
            return (
              showPageItem(index, page) && (
                <React.Fragment key={`arrival-${index}`}>
                  <ListItem alignItems="flex-start">
                    <ArrivalDetailAvatar
                      line={arrival.LINE}
                      direction={arrival.DIRECTION}
                    />
                    <Grid container>
                      {/** @ts-ignore : Custom breakpoints not working with typescript in codesandbox */}
                      <Grid item xs={6} xsMobile={3}>
                        <ArrivalDetailText label="Time" value={arrival.WAITING_TIME} />
                      </Grid>
                      {/** @ts-ignore : Custom breakpoints not working with typescript in codesandbox */}
                      <Grid item xs={6} xsMobile={5}>
                        <ArrivalDetailText
                          label="Station"
                          value={stations[arrival.STATION]?.name || arrival.STATION}
                        />
                      </Grid>
                      {/** @ts-ignore : Custom breakpoints not working with typescript in codesandbox */}
                      <Grid item xs={12} xsMobile={4}>
                        <ArrivalDetailText
                          label="Destination"
                          value={
                            destinations[arrival.DESTINATION]?.name || arrival.DESTINATION
                          }
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  {index < displayedArrivals.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              )
            );
          })}
        </List>
        {numPages > 1 && (
          <PaginationWrapper>
            <Pagination
              showFirstButton
              showLastButton
              count={numPages}
              page={page}
              onChange={handlePageChange}
            />
          </PaginationWrapper>
        )}
      </>
    </ArrivalsPaper>
  );
};
