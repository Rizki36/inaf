import "../styles/globals.css";
import theme from "../configs/mui/theme";
import React from "react";
import type { AppProps } from "next/app";
import { Page } from "../@types";
import Auth from "../components/Auth";
import { Provider } from "react-redux";
import store, { persistor } from "../configs/redux/store";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import AdminLayout from "components/layouts/admin";
import { PersistGate } from "redux-persist/lib/integration/react";

type Props = AppProps & {
    Component: Page;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
    // default layout
    const Layout = Component.layout ?? AdminLayout;

    return (
        <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Layout>
                            <Auth {...Component.auth}>
                                <Component {...pageProps} />
                            </Auth>
                        </Layout>
                    </PersistGate>
                </Provider>
            </StyledEngineProvider>
        </ThemeProvider>
    );
}

export default MyApp;
