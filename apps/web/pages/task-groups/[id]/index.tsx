import { Page } from "@/types/index";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { gridSpacing } from "@/configs/constants";

/** components */
import TaskGroupDetailsView from "@/components/pages/task-groups/TaskGroupDetailsView";
import CurrentProjectCard from "@/components/pages/task-groups/widgets/CurrentProjectCard";

const TaskGroupDetails: Page = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={12} sm={12} xs={12}>
                <CurrentProjectCard isLoading={false} />
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12}>
                <TaskGroupDetailsView taskGroupId={id as string} />
            </Grid>
        </Grid>
    );
};

export default TaskGroupDetails;
