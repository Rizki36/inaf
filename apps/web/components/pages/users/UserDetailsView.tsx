import MainCard from "@/components/ui-component/cards/MainCard";
import { gridSpacing } from "@/configs/constant";
import { Grid, Typography } from "@mui/material";
import { getUserDetailsDTO } from "server";

interface UserDetailsViewProps {
    data: getUserDetailsDTO;
}

const UserDetailsView = (props: UserDetailsViewProps) => {
    const {
        data: { data },
    } = props;
    return (
        <MainCard title="User Details">
            <Grid container spacing={gridSpacing}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        Username
                    </Typography>
                    <Typography variant="body2">{data.username}</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        Name
                    </Typography>
                    <Typography variant="body2">{data.name}</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        Email
                    </Typography>
                    <Typography variant="body2">{data.email}</Typography>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        Description
                    </Typography>
                    <Typography variant="body2">{data.description}</Typography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UserDetailsView;