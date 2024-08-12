// React
import { useState } from 'react';
// Material UI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useGetMartaArrivals } from './api/use-get-marta-arrivals';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
// Internal
import { ArrivalFiltersFormData as FilterData } from './components/ArrivalFiltersForm/arrival-filters-form.data';
import { MartaAppBar, ArrivalFiltersForm, ArrivalList, ErrorAlert } from './components';
import { TwitterFeed } from './components/TwitterFeed/twitter-feed';
import './styles.css';

const AppContainer = styled(Container)(({ theme }) => ({
  marginTop: '25px',
  [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
    marginTop: '15px',
  },
}));

const LeftContainer = styled(Grid)(({ theme }) => ({
  flexDirection: 'column',
  [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
    flexDirection: 'column-reverse',
  },
}));

const App = () => {
  const { data, error, isLoading } = useGetMartaArrivals();
  const [arrivalFilters, setArrivalFilters] = useState<FilterData>();

  if (isLoading) return <LinearProgress />;

  if (!data) return <ErrorAlert>No Train Data</ErrorAlert>;

  if (error) {
    return <ErrorAlert>{(error.response?.data as string) || 'Network Error'}</ErrorAlert>;
  }

  return (
    <>
      <MartaAppBar />
      <AppContainer>
        <Grid container spacing={2}>
          <Grid xs={12} sm={5}>
            <LeftContainer container spacing={2}>
              <Grid>
                <ArrivalFiltersForm
                  data={data}
                  onFormChange={(formData: FilterData) => setArrivalFilters(formData)}
                />
              </Grid>
              <Grid>
                <TwitterFeed />
              </Grid>
            </LeftContainer>
          </Grid>
          <Grid xs={12} sm={7}>
            <ArrivalList data={data} filters={arrivalFilters} />
          </Grid>
        </Grid>
      </AppContainer>
    </>
  );
};

export default App;
