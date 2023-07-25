import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { wrap } from "@hilma/tools";
import { UserContextProvider } from "./contexts/UserContextProvider.context.tsx";
import App from "./App.tsx";

import { CSSPrioritize } from "@hilma/forms";
import "./styles/reset.scss";
import "./styles/generic.scss";

const theme = createTheme({
   palette: {
      primary: {
         main: "#6EB9CF",
      },
      secondary: {
         main: "##707070",
      },
      text: {
         primary: "#707070",
         secondary: "#6EB9CF",
      },
      background: {
         default: "#FFFFFF",
      },
   },
   direction: "rtl",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      {wrap(React.StrictMode, CSSPrioritize, BrowserRouter, UserContextProvider, [ThemeProvider, { theme: theme }])(
         <App />,
      )}
   </React.StrictMode>,
);
