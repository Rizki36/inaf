import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

/** components */
import MainCard from "@/components/ui-component/cards/MainCard";
import SkeletonRunningProjectCard from "@/components/ui-component/cards/Skeleton/EarningCard";

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: "#fff",
    overflow: "hidden",
    position: "relative",
    "&:after": {
        content: '""',
        position: "absolute",
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: "50%",
        top: -85,
        right: -95,
        [theme.breakpoints.down("sm")]: {
            top: -105,
            right: -140,
        },
    },
    "&:before": {
        content: '""',
        position: "absolute",
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: "50%",
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down("sm")]: {
            top: -155,
            right: -70,
        },
    },
}));

const CurrentProjectCard = ({ isLoading }: { isLoading: boolean }) => {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonRunningProjectCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item></Grid>
                                    <Grid item></Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography
                                    sx={{
                                        fontSize: "1rem",
                                        fontWeight: 500,
                                        color: theme.palette.secondary[200],
                                    }}
                                >
                                    Current Project
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography
                                            sx={{
                                                fontSize: "2.125rem",
                                                fontWeight: 500,
                                                mr: 1,
                                                mt: 1.75,
                                                mb: 0.75,
                                            }}
                                        >
                                            Dikirim.in
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                                cursor: "pointer",
                                                ...theme.typography.smallAvatar,
                                                backgroundColor:
                                                    theme.palette
                                                        .secondary[200],
                                                color: theme.palette.secondary
                                                    .dark,
                                            }}
                                        >
                                            <ArrowUpwardIcon
                                                fontSize="inherit"
                                                sx={{
                                                    transform:
                                                        "rotate3d(1, 1, 1, 45deg)",
                                                }}
                                            />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

export default CurrentProjectCard;
