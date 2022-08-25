import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { Page } from "../@types";
import Auth from "../components/Auth";
import { Provider } from "react-redux";
import store, { persistor } from "../configs/redux/store";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import MainLayout from "@/components/layout/MainLayout";
import { PersistGate } from "redux-persist/lib/integration/react";
import themes from "configs/themes";
import { useAppSelector } from "@/configs/redux/hooks";

// style + assets
import "../assets/scss/style.scss";

type Props = AppProps & {
    Component: Page;
};

const Theme = ({ children }) => {
    // default layout
    const customization = useAppSelector((state) => state.customization);

    return (
        <ThemeProvider theme={themes(customization)}>
            <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
        </ThemeProvider>
    );
};

function MyApp({ Component, pageProps: { ...pageProps } }: Props) {
    const Layout = Component.layout ?? MainLayout;
    return (
        <Provider store={store}>
            {/* @ts-ignore */}
            <PersistGate loading={null} persistor={persistor}>
                <Theme>
                    {/* @ts-ignore */}
                    <Auth {...Component.auth}>
                        {/* @ts-ignore */}
                        <Layout>
                            {/* @ts-ignore */}
                            <Component {...pageProps} />
                        </Layout>
                    </Auth>
                </Theme>
            </PersistGate>
        </Provider>
    );
}

export default MyApp;
