// React
import { useState, useEffect } from 'react';
// Material UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
// Internal
import { ArrivalFiltersFormData } from './arrival-filters-form.data';
import { MartaArrivals } from '../../api/types';
import { SelectFilter } from './components/select-filter';

const FormHeader = styled(Typography)(({ theme }) => ({
  margin: '5px 0 15px',
  [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
    fontSize: '1rem',
  },
}));

interface ArrivalFiltersFormProps {
  data: MartaArrivals;
  onFormChange: (formData: ArrivalFiltersFormData) => void;
}

/**
 * Component for displaying a form with select filters for the arrivals list
 * @param data Arrivals list data
 * @param onFormChange Form change handler function
 */
export const ArrivalFiltersForm = ({
  data: { lines, destinations, stations },
  onFormChange,
}: ArrivalFiltersFormProps) => {
  const [formState, setFormState] = useState<ArrivalFiltersFormData>({
    destination: '',
    line: '',
    station: '',
  });

  /**
   * Hook for determining whether an option should be de-selected when a data change
   * results in that option no longer being available
   */
  useEffect(() => {
    let { destination, line, station } = formState;
    destination = !!destinations[destination] ? formState.destination : '';
    line = !!lines[line] ? formState.line : '';
    station = !!stations[station] ? formState.station : '';
    onFormChange({ destination, line, station });
  }, [formState, lines, destinations, stations, onFormChange]);

  /**
   * Function for handling input changes in a generic method by setting the state based on
   * the name of the input
   */
  const handleChange = ({ target: { name, value } }: SelectChangeEvent) => {
    setFormState({ ...formState, [name]: value });
  };

  return (
    <Paper>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          width: '100%',
          '& > .MuiFormControl-root:not(:first-of-type)': {
            marginTop: '20px',
          },
        }}
      >
        <FormHeader variant="h6" color="text.secondary">
          Arrival Filters
        </FormHeader>
        <SelectFilter
          name="destination"
          label="Destination"
          value={formState.destination}
          formData={formState}
          availableOptions={{ lines, stations }}
          options={destinations}
          onChange={handleChange}
        />
        <SelectFilter
          name="line"
          label="Line"
          value={formState.line}
          formData={formState}
          availableOptions={{ destinations, stations }}
          options={lines}
          onChange={handleChange}
        />
        <SelectFilter
          name="station"
          label="Station"
          value={formState.station}
          formData={formState}
          availableOptions={{ destinations, lines }}
          options={stations}
          onChange={handleChange}
        />
      </Box>
    </Paper>
  );
};
