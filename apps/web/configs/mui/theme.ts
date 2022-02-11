import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#5670E9",
        },
        secondary: {
            main: "#A586FE",
        },
        error: {
            main: "#FF8989",
        },
        warning: {
            main: "#F0BB52",
        },
        success: {
            main: "#6DDB85",
        },
    },
    typography: {
        // fontFamily: [
        //     '"Segoe UI"',
        //     "-apple-system",
        //     "BlinkMacSystemFont",
        //     "Roboto",
        //     '"Helvetica Neue"',
        //     "Arial",
        //     "sans-serif",
        //     '"Apple Color Emoji"',
        //     '"Segoe UI Emoji"',
        //     '"Segoe UI Symbol"',
        // ].join(","),
    },
});

export default theme;
