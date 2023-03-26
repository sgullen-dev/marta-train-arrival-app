import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const DetailsBox = styled('div')(({ theme }) => ({
  margin: '8px 0 4px',
  textOverflow: 'ellipsis',
  // @ts-ignore : Custom breakpoints not working with typescript in codesandbox
  [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
    margin: '10px 0 4px',
  },
}));

const DetailValueText = styled(Typography)(({ theme }) => ({
  // @ts-ignore : Custom breakpoints not working with typescript in codesandbox
  [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
    fontSize: '0.85rem',
  },
}));

interface ArrivalDetailTextProps {
  label: string;
  value: string;
}

/**
 * Component for displaying a formatted text block containing arrival details
 * @param label Arrival detail name - Ex: Line, Station, etc
 * @param value Arrival detail value - Ex: Blue, Chamblee, etc
 */
export const ArrivalDetailText = ({ label, value }: ArrivalDetailTextProps) => {
  return (
    <DetailsBox>
      <DetailValueText noWrap variant="body2" color="text.secondary">
        {label}
      </DetailValueText>
      <DetailValueText noWrap variant="body1" color="text.primary">
        {value}
      </DetailValueText>
    </DetailsBox>
  );
};
