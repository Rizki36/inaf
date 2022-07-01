import { useEffect } from "react";
import { gridSpacing } from "@/configs/constants";
import Grid from "@mui/material/Grid";
import ProjectDetailWidget from "./ProjectDetailWidget";
import ProjectWidget from "./ProjectWidget";
import QuickLinkWidget from "./QuickLinkWidget";
import TaskProgressWidget from "./TaskProgressWidget";
import TaskWidget from "./TaskWidget";
import TotalTaskWidget from "./TotalTaskWidget";
import TotalWorkerWidget from "./TotalWorkerWidget";
import { useDashboard } from "@/libs/query/dashboardQuery";
import { useAppDispatch, useAppSelector } from "@/configs/redux/hooks";
import { setProject } from "@/configs/redux/dashboardSlice";

const Dashboard = () => {
    const dispatch = useAppDispatch();

    const { currentProject } = useAppSelector((state) => state.dashboard);
    const { data } = useDashboard(currentProject);

    useEffect(() => {
        if (data?.projectId) {
            dispatch(setProject(data.projectId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.projectId]);

    const progressTask = data?.totalTaskDone || 0;

    const allTask =
        progressTask + data?.totalTaskOpen ||
        0 + data?.totalTaskInProgress ||
        0;

    const percent = (progressTask / allTask) * 100 || 0;

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={12} sm={12} xs={12}>
                <ProjectWidget />
            </Grid>
            <Grid item lg={3} md={12} sm={12} xs={12}>
                <TotalTaskWidget totalTask={data?.totalTask} />
            </Grid>
            <Grid item lg={3} md={12} sm={12} xs={12}>
                <TotalWorkerWidget totalWorker={data?.totalUserInProject} />
            </Grid>
            <Grid item lg={2} md={12} sm={12} xs={12}>
                <ProjectDetailWidget />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
                <TaskProgressWidget percent={percent} />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
                <TaskWidget projectId={currentProject} />
            </Grid>
            <Grid item lg={2} md={12} sm={12} xs={12}>
                <QuickLinkWidget />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
