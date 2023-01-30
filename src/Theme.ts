import { createTheme } from '@mui/material';

export const colors = {
  white: '#FFFFFF',
  disabled: 'rgba(0, 0, 0, 0.26)',
  highlight: '#1976d2',
};

export const theme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          '&[disabled]': {
            color: colors.disabled,
            pointerEvents: 'none',
          },
        },
      },
    },
  },
});
