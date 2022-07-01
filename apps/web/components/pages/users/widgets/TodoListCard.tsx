import { useTheme } from "@mui/material/styles";
import {
    Avatar,
    Button,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

import MainCard from "@/components/ui-component/cards/MainCard";
import SkeletonPopularCard from "@/components/ui-component/cards/Skeleton/PopularCard";

import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { gridSpacing } from "@/configs/constant";
import AnimateButton from "@/components/ui/AnimateButton";

const TodoListCard = ({ isLoading }: { isLoading: boolean }) => {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    alignContent="center"
                                    justifyContent="space-between"
                                >
                                    <Grid item>
                                        <Typography variant="h4">
                                            Task Childs
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                fullWidth
                                                size="small"
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Add Task
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid
                                            container
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="inherit"
                                                >
                                                    Halaman Admin
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                >
                                                    <Grid item>
                                                        <Avatar
                                                            variant="rounded"
                                                            sx={{
                                                                minWidth: 16,
                                                                height: 16,
                                                                borderRadius:
                                                                    "5px",
                                                                backgroundColor:
                                                                    theme
                                                                        .palette
                                                                        .error
                                                                        .light,
                                                                color: theme
                                                                    .palette
                                                                    .error.dark,
                                                                ml: 2,
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="subtitle2"
                                                                sx={{
                                                                    color: "error.dark",
                                                                }}
                                                            >
                                                                Urgen
                                                            </Typography>
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">
                                            10-12-2021
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid
                                            container
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="inherit"
                                                >
                                                    Halaman Admin
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">
                                            10-12-2021
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions
                        sx={{ p: 1.25, pt: 0, justifyContent: "center" }}
                    >
                        <Button size="small" disableElevation>
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

export default TodoListCard;
