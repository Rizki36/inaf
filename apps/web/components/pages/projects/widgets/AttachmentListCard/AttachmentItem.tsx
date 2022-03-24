import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AttachmentItem = () => {
    const theme = useTheme();
    return (
        <>
            <Grid container direction="column">
                <Grid item>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Grid item>
                            <Typography variant="subtitle1" color="inherit">
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
                                            borderRadius: "5px",
                                            backgroundColor:
                                                theme.palette.error.light,
                                            color: theme.palette.error.dark,
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
                    <Typography variant="subtitle2">10-12-2021</Typography>
                </Grid>
            </Grid>
            <Divider sx={{ my: 1.5 }} />
        </>
    );
};

export default AttachmentItem;
