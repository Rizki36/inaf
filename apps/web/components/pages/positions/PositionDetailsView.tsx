import MainCard from "@/components/ui-component/cards/MainCard";
import { gridSpacing } from "@/configs/constant";
import { Grid, Typography } from "@mui/material";
import { getPositionDetailsDTO } from "server";

interface UserDetailsViewProps {
    data: getPositionDetailsDTO;
    btnSecondary: React.ReactNode;
}

const UserDetailsView = (props: UserDetailsViewProps) => {
    const {
        data: { data },
        btnSecondary,
    } = props;
    return (
        <MainCard title="User Details" secondary={<>{btnSecondary}</>}>
            <Grid container spacing={gridSpacing}>
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
            </Grid>
        </MainCard>
    );
};

export default UserDetailsView;
