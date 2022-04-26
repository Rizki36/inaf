import { gridSpacing } from "@/configs/constant";
import Grid from "@mui/material/Grid";
import ProjectDetailWidget from "./ProjectDetailWidget";
import ProjectWidget from "./ProjectWidget";
import QuickLinkWidget from "./QuickLinkWidget";
import TaskProgressWidget from "./TaskProgressWidget";
import TaskWidget from "./TaskWidget";
import TotalTaskWidget from "./TotalTaskWidget";
import TotalWorkerWidget from "./TotalWorkerWidget";

const Dashboard = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={12} sm={12} xs={12}>
                <ProjectWidget />
            </Grid>
            <Grid item lg={3} md={12} sm={12} xs={12}>
                <TotalTaskWidget />
            </Grid>
            <Grid item lg={3} md={12} sm={12} xs={12}>
                <TotalWorkerWidget />
            </Grid>
            <Grid item lg={2} md={12} sm={12} xs={12}>
                <ProjectDetailWidget />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
                <TaskProgressWidget />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
                <TaskWidget />
            </Grid>
            <Grid item lg={2} md={12} sm={12} xs={12}>
                <QuickLinkWidget />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
