import { gridSpacing } from "@/configs/constant";
import { Grid, Skeleton } from "@mui/material";
import MainCard from "./cards/MainCard";

const LoadingCard = () => {
    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Skeleton animation="wave" />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default LoadingCard;
