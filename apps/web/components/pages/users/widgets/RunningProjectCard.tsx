import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase, Grid, Typography } from "@mui/material";
import MainCard from "@/components/ui/MainCard";
import SkeletonRunningProjectCard from "@/components/ui/Skeleton/EarningCard";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useUserProject } from "@/libs/query/userQuery";
import { useEffect, useState } from "react";
import { Project } from "server";
import Link from "next/link";

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

const RunningProjectCard = ({ userId }: { userId: string }) => {
    const theme = useTheme();
    const [currentProject, setCurrentProject] = useState<Project>(null);

    const { data, isError, isLoading } = useUserProject({
        userId,
    });

    useEffect(() => {
        if (data?.length) setCurrentProject(data[0]);
    }, [data]);

    if (isLoading) return <SkeletonRunningProjectCard />;

    const handleChange = (direction: "next" | "back" = "next") => {
        /** current selected project index */
        const currentIndex = data.findIndex(
            (project) => project.id === currentProject?.id
        );

        let nextIndex: number;

        if (direction === "next") {
            nextIndex = currentIndex + 1;
            /** set to first project when next index greather then last project index */
            if (nextIndex > data.length - 1) nextIndex = 0;
        } else {
            nextIndex = currentIndex - 1;
            /** set to end project when next index less then 0 */
            if (nextIndex < 0) nextIndex = data.length - 1;
        }

        /** update selected project */
        setCurrentProject(data[nextIndex]);
    };

    return (
        <>
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
                            <div className="flex items-center justify-between">
                                <Typography
                                    sx={{
                                        fontSize: "1rem",
                                        fontWeight: 500,
                                        color: theme.palette.secondary[200],
                                    }}
                                >
                                    Running Project
                                </Typography>
                                <div className="flex items-center gap-x-1 z-30">
                                    <ButtonBase
                                        onClick={() => handleChange("back")}
                                        sx={{ borderRadius: "12px" }}
                                    >
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                background: "none",
                                            }}
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </Avatar>
                                    </ButtonBase>
                                    <ButtonBase
                                        onClick={() => handleChange("next")}
                                        sx={{ borderRadius: "12px" }}
                                    >
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                background: "none",
                                            }}
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </Avatar>
                                    </ButtonBase>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center">
                                {!!currentProject ? (
                                    <>
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
                                                {currentProject?.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Link
                                                href={`/projects/${currentProject?.id}`}
                                                passHref
                                            >
                                                <Avatar
                                                    sx={{
                                                        cursor: "pointer",
                                                        ...theme.typography
                                                            .smallAvatar,
                                                        backgroundColor:
                                                            theme.palette
                                                                .secondary[200],
                                                        color: theme.palette
                                                            .secondary.dark,
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
                                            </Link>
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Typography
                                            sx={{
                                                fontSize: "1rem",
                                                fontWeight: 500,
                                                mr: 1,
                                                mt: 1.75,
                                                mb: 0.75,
                                            }}
                                        >
                                            No Running Project
                                        </Typography>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>
        </>
    );
};

export default RunningProjectCard;
