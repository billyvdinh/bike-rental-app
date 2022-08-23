import React from "react";
import Head from "next/head";
import Router from "next/router";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";
import nProgress from "nprogress";
import { Provider as ReduxProvider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "../contexts/firebase-auth-context";

import { store } from "../store/store";
import createEmotionCache from "../utils/createEmotionCache";
import { createTheme } from "../theme";

const clientSideEmotionCache = createEmotionCache();

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>#1 Bike Rental Provider</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <ThemeProvider
              theme={createTheme({
                direction: "ltr",
                responsiveFontSizes: true,
                theme: "light",
              })}
            >
              <CssBaseline />
              <Toaster position="top-center" />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
