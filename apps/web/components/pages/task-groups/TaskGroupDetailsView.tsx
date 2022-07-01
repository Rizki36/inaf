import { gridSpacing } from "@/configs/constant";
import { useTaskGroupDetails } from "@/libs/query/taskGroupQuery";
import { Button, Grid, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import TaskGroupDetailsEdit from "./TaskGroupDetailsEdit";

/** components */
import MainCard from "@/components/ui-component/cards/MainCard";
import LoadingCard from "@/components/ui/LoadingCard";
import ErrorCard from "@/components/ui-component/ErrorCard";

interface TaskGroupDetailsViewProps {
    taskGroupId: string;
}

const TaskGroupDetailsView = (props: TaskGroupDetailsViewProps) => {
    const { taskGroupId } = props;

    const [edit, setEdit] = useState(false);
    const toggleEdit = useCallback(() => setEdit(!edit), [edit]);

    /** hook destruction to get data task group details */
    const { data, isError, isLoading, mutate } = useTaskGroupDetails({
        id: taskGroupId,
    });

    /** button edit or cancel edit */
    const btnAction = useMemo(() => {
        return (
            <Button onClick={toggleEdit}>
                {edit ? "Cancel Edit" : "Edit"}
            </Button>
        );
    }, [edit, toggleEdit]);

    if (isLoading) return <LoadingCard />;
    if (isError) return <ErrorCard />;

    if (edit) {
        return (
            <TaskGroupDetailsEdit
                id={taskGroupId}
                data={data.data}
                edit={{ edit, toggleEdit }}
                mutate={mutate}
                btnSecondary={btnAction}
            />
        );
    }

    const { data: user } = data;

    return (
        <MainCard title="Task Group Details" secondary={<>{btnAction}</>}>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={6} xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Name
                            </Typography>
                            <Typography variant="body2">
                                {user.name || "-"}
                            </Typography>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Project
                            </Typography>
                            <Typography variant="body2">
                                {user?.project?.name || "-"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        Description
                    </Typography>
                    <Typography variant="body2">{user.description}</Typography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default TaskGroupDetailsView;
