import { Page } from "@/types/index";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { gridSpacing } from "@/configs/constant";

/** components */
import TaskDetailsView from "@/components/pages/tasks/TaskDetailsView";
import CurrentProjectCard from "@/components/pages/tasks/widgets/CurrentProjectCard";

const TaskDetails: Page = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={12} sm={12} xs={12}>
                <CurrentProjectCard isLoading={false} />
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12}>
                <TaskDetailsView taskId={id as string} />
            </Grid>
        </Grid>
    );
};

export default TaskDetails;
