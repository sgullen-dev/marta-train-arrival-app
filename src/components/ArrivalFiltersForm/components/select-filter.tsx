// React
import { useCallback } from 'react';
// Material UI
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// Internal
import { MartaArrivalOptionData } from '../../../api/types';
import { ArrivalFiltersFormData } from '../arrival-filters-form.data';

interface SelectFilterProps {
  name: string;
  label: string;
  value: string;
  formData: ArrivalFiltersFormData;
  availableOptions: {
    destinations?: Record<string, MartaArrivalOptionData>;
    lines?: Record<string, MartaArrivalOptionData>;
    stations?: Record<string, MartaArrivalOptionData>;
  };
  options: Record<string, MartaArrivalOptionData>;
  onChange: (e: SelectChangeEvent) => void;
}

/**
 * Component for displaying a select with options based on the available
 * options derived from existing selections
 * @param name Name of the input field
 * @param label Label for the input field
 * @param value Value of the controlled input
 * @param formData Current filter values
 * @param availableOptions What options should be available with the current filters -
 *    Ex: If this is for the "destination" input, which destinations are connected to
 *    the currently selected line and/or station
 * @param options Options for the select
 * @param onChange Input change handler function
 */
export const SelectFilter = ({
  name,
  label,
  value,
  formData: { line, station, destination: dest },
  availableOptions: { lines, stations, destinations: dests },
  options,
  onChange,
}: SelectFilterProps) => {
  /**
   * Function for determining whether an option should be disabled
   */
  const checkOptionDisabled = useCallback(
    (optionKey: string): boolean => {
      // If there are filters set, check if the current option is available
      const destValid =
        name === 'destination' || !dest || dests?.[dest]?.available.has(optionKey);
      const lineValid =
        name === 'line' || !line || lines?.[line]?.available.has(optionKey);
      const stationValid =
        name === 'station' || !station || stations?.[station]?.available.has(optionKey);
      return !(destValid && lineValid && stationValid);
    },
    [name, dest, dests, line, lines, station, stations]
  );

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-select-label`}
        id={`${name}-select`}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
      >
        <MenuItem value={''}>Any</MenuItem>
        {Object.keys(options).map((optionKey: string) => {
          return (
            <MenuItem
              key={`${name}-${optionKey}`}
              value={optionKey}
              disabled={checkOptionDisabled(optionKey)}
            >
              {options[optionKey].name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
