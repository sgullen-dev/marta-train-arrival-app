// React
import { useMemo } from 'react';
// Material UI
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { blue, green, red, yellow, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const LineAvatarWrapper = styled(ListItemAvatar)(({ theme }) => ({
  // @ts-ignore : Custom breakpoints not working with typescript in codesandbox
  [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
    marginTop: '12px',
  },
}));

const LineAvatar = styled(Avatar)(({ theme }) => ({
  // @ts-ignore : Custom breakpoints not working with typescript in codesandbox
  [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
    width: '35px',
    height: '35px',
  },
}));

interface ArrivalDetailAvatarProps {
  line: string;
  direction: string;
}

/**
 * Component for displaying an "avatar" for the train line and direction,
 * appears as a box with the background color of the line and a letter indicating direction
 * @param line The train line
 * @param direction The train direction
 */
export const ArrivalDetailAvatar = ({ line, direction }: ArrivalDetailAvatarProps) => {
  // Determine the appropriate color for the avatar background from the line name
  const bgcolor = useMemo(() => {
    switch (line) {
      case 'BLUE':
        return blue[500];
      case 'GREEN':
        return green[500];
      case 'RED':
        return red[500];
      case 'GOLD':
        return yellow[700];
      default:
        return grey[700];
    }
  }, [line]);

  return (
    <LineAvatarWrapper>
      <LineAvatar variant="rounded" sx={{ bgcolor }}>
        {direction}
      </LineAvatar>
    </LineAvatarWrapper>
  );
};
