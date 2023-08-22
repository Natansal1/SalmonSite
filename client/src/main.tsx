import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material";
import { wrap } from "@hilma/tools";
import { UserContextProvider } from "./contexts/UserContextProvider.context.tsx";
import PageLocationContextProvider from "./contexts/PageLocationContextProvider.tsx";
import SearchContextProvider from "./contexts/SearchContextProvider.context.tsx";
import { AlertProvider, CSSPrioritize } from "@hilma/forms";
import "filter-and-map";

import "./styles/reset.scss";
import "./styles/generic.scss";

import App from "./App.tsx";

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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
   <>
      {wrap(
         React.StrictMode,
         [QueryClientProvider, { client: queryClient }],
         CSSPrioritize,
         AlertProvider,
         BrowserRouter,
         PageLocationContextProvider,
         SearchContextProvider,
         UserContextProvider,
         [ThemeProvider, { theme: theme }],
      )(<App />)}
   </>,
);
