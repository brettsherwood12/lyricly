import { createTheme } from '@mui/material';

const { palette } = createTheme(); // mui default theme palette

export const theme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          '&[disabled]': {
            color: palette.action.disabled,
            pointerEvents: 'none',
          },
        },
      },
    },
  },
});
