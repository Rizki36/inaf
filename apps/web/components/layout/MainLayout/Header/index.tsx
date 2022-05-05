// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase, Typography } from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import ProfileSection from "./ProfileSection";

// assets
import { IconMenu2 } from "@tabler/icons";
import { useRouter } from "next/router";

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const router = useRouter();
    const pathNames = router.pathname.replace("-", " ").split("/");

    const title = pathNames[1];

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: "flex",
                    [theme.breakpoints.down("md")]: {
                        width: "auto",
                    },
                }}
            >
                <Box
                    component="span"
                    sx={{
                        display: { xs: "none", md: "flex" },
                        justifyContent: { md: "center" },
                        flexGrow: 1,
                    }}
                >
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: "all .2s ease-in-out",
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            "&:hover": {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light,
                            },
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>

            <Box ml={5}>
                <Typography
                    sx={{ textTransform: "capitalize" }}
                    fontSize={"1.5rem"}
                >
                    {title}
                </Typography>
            </Box>

            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* <NotificationSection /> */}
            <ProfileSection />
        </>
    );
};

export default Header;
