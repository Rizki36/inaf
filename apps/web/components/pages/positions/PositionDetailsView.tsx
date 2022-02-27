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
        <MainCard title="Position Details" secondary={<>{btnSecondary}</>}>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div style={{ marginTop:"16px" }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Name
                        </Typography>
                        <Typography variant="body2">{data.name}</Typography>
                    </div>
                    <div style={{ marginTop:"16px" }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Description
                        </Typography>
                        <Typography variant="body2">{data.description}</Typography>
                    </div>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UserDetailsView;
