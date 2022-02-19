import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { getUserDetailsDTO } from "server";

interface UserDetailsViewProps {
    data: getUserDetailsDTO;
}

const UserDetailsView = (props: UserDetailsViewProps) => {
    const {
        data: { data },
    } = props;
    return (
        <Card>
            <CardContent>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    columns={2}
                >
                    <Grid item>
                        <div>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Username
                            </Typography>
                            <Typography variant="body2">
                                {data.username}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Name
                            </Typography>
                            <Typography variant="body2">{data.name}</Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Email
                            </Typography>
                            <Typography variant="body2">
                                {data.email}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <div>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Description
                            </Typography>
                            <Typography variant="body2">
                                {data.description}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UserDetailsView;
