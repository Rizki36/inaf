import { gridSpacing } from "@/configs/constants";
import { Page } from "@/types/index";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

/** components */
import TaskDetailsView from "@/components/pages/tasks/TaskDetailsView";
import TaskWorkers from "@/components/pages/tasks/TaskWorker";
import CurrentProjectCard from "@/components/pages/tasks/widgets/CurrentProjectCard";

const TaskDetails: Page = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={12} sm={12} xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <CurrentProjectCard isLoading={false} />
                    </Grid>
                    <Grid item xs={12}>
                        <TaskWorkers taskId={id as string} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12}>
                <TaskDetailsView taskId={id as string} />
            </Grid>
        </Grid>
    );
};

export default TaskDetails;
