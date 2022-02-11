import "../styles/globals.css";
import React, { Fragment } from "react";
import type { AppProps } from "next/app";
import { Page } from "../@types";
import Auth from "../components/Auth";
import { Provider } from "react-redux";
import store from "../configs/redux/store";
import { StyledEngineProvider } from "@mui/material";

type Props = AppProps & {
    Component: Page;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
    // default layout
    const Layout = Component.layout ?? Fragment;

    return (
        <>
            <StyledEngineProvider injectFirst>
                <Provider store={store}>
                    <Layout>
                        <Auth {...Component.auth}>
                            <Component {...pageProps} />
                        </Auth>
                    </Layout>
                </Provider>
            </StyledEngineProvider>
        </>
    );
}

export default MyApp;
