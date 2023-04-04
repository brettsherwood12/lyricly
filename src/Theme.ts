import { createTheme } from '@mui/material';

export const colors = {
  white: '#FFFFFF',
  disabled: 'rgba(0, 0, 0, 0.26)',
  highlight: '#1976d2',
};

const defaultTheme = createTheme();

const { breakpoints } = defaultTheme;

export const theme = {
  ...defaultTheme,
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
    MuiTypography: {
      styleOverrides: {
        h6: {
          [breakpoints.down('md')]: {
            fontSize: '16px',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          [breakpoints.down('md')]: {
            fontSize: '12px',
          },
        },
      },
    },
  },
};
