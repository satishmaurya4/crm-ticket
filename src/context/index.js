import * as React from 'react';
import { createContext, useContext, useState } from "react";
import {createTheme } from '@mui/material/styles';

import { toast } from "react-toastify";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
            setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            console.log("toggleColorMode");
      },
    }),
    []
  );

  const ModeTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
              mode,
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
      }),
    [mode]
    );
    console.log("mode: " + mode);
  return (
    <AppContext.Provider value={{ colorMode, ModeTheme, mode }}>
      {children}
    </AppContext.Provider>
  );
};

export const Consume = () => useContext(AppContext);

export default AppProvider;
