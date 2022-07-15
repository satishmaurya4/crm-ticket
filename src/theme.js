import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
          primary: {main: "rgb(6, 124, 84)",
          light: "rgb(176, 73, 5)",
    },
      secondary: {
        main: "rgb(6, 54, 125)",
    },
    warning: {
        main: "rgb(176, 73, 5)",
    },
    info: {
      main: "rgb(8, 144, 189)",
    }
      },
      components: {
        MuiButtonBase: {
              defaultProps: {
                disableRipple: true,
          },
        },
      },
  })