import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// React
import React, { Suspense } from "react";
import * as ReactDOMClient from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// Apollo
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";

// Local Styles
import "./styles/index.scss";

// Components and Pages
import Loader from "./components/Loader";
import MainRouter from "./routers/MainRouter";

import { ToastContainer } from "react-toastify";

// Global styles
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();
const root = ReactDOMClient.createRoot(document.getElementById("root"));

// Render React
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer position="bottom-right" />
            <MainRouter />
          </ThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
