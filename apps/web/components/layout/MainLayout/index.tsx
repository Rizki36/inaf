import { useAppDispatch } from "configs/redux/hooks";
import { useAppSelector } from "../../../configs/redux/hooks";
import { useEffect } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
    AppBar,
    Box,
    CssBaseline,
    Toolbar,
    useMediaQuery,
} from "@mui/material";

// project imports
import Breadcrumbs from "../../ui/Breadcrumbs";
import Header from "./Header";
import Sidebar from "./Sidebar";
import navigation from "@/components/layout/MainLayout/menuItem";
import { drawerWidth } from "@/configs/constants";

// assets
import { IconChevronRight } from "@tabler/icons";
import { SET_MENU } from "@/configs/redux/customizationSlice";

// styles
const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
})(
    // @ts-ignore
    ({ theme, open }) => ({
        ...theme.typography.mainContent,
        ...(!open && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            [theme.breakpoints.up("md")]: {
                marginLeft: -(drawerWidth - 20),
                width: `calc(100% - ${drawerWidth}px)`,
            },
            [theme.breakpoints.down("md")]: {
                marginLeft: "20px",
                width: `calc(100% - ${drawerWidth}px)`,
                padding: "16px",
            },
            [theme.breakpoints.down("sm")]: {
                marginLeft: "10px",
                width: `calc(100% - ${drawerWidth}px)`,
                padding: "16px",
                marginRight: "10px",
            },
        }),
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            width: `calc(100% - ${drawerWidth}px)`,
            [theme.breakpoints.down("md")]: {
                marginLeft: "20px",
            },
            [theme.breakpoints.down("sm")]: {
                marginLeft: "10px",
            },
        }),
    })
);

const MainLayout = ({ children }) => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));

    // Handle left drawer
    const leftDrawerOpened = useAppSelector(
        (state) => state.customization.opened
    );
    const dispatch = useAppDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch(
            SET_MENU({
                opened: !leftDrawerOpened,
            })
        );
    };

    useEffect(() => {
        dispatch(SET_MENU({ opened: !matchDownMd }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened
                        ? theme.transitions.create("width")
                        : "none",
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar
                drawerOpen={leftDrawerOpened}
                drawerToggle={handleLeftDrawerToggle}
            />

            {/* main content */}
            {/* @ts-ignore */}
            <Main theme={theme} open={leftDrawerOpened}>
                {/* breadcrumb */}
                {/* @ts-ignore */}
                <Breadcrumbs
                    separator={IconChevronRight}
                    navigation={navigation}
                    icon
                    title
                    rightAlign
                />
                {children}
            </Main>
        </Box>
    );
};

export default MainLayout;
