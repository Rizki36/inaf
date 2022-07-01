import { gridSpacing } from "@/configs/constant";
import { useTaskDetails } from "@/libs/query/taskQuery";
import { Button, Grid, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import TaskDetailsEdit from "./TaskDetailsEdit";

/** components */
import MainCard from "@/components/ui-component/cards/MainCard";
import { formatDate } from "@/helpers/dateHelper";
import LoadingCard from "@/components/ui/LoadingCard";
import ErrorCard from "@/components/ui-component/ErrorCard";

interface TaskDetailsViewProps {
    taskId: string;
}

const TaskDetailsView = (props: TaskDetailsViewProps) => {
    const { taskId: taskGroupId } = props;

    const [edit, setEdit] = useState(false);
    const toggleEdit = useCallback(() => setEdit(!edit), [edit]);

    /** hook destruction to get data task group details */
    const { data, isError, isLoading, mutate } = useTaskDetails({
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
            <TaskDetailsEdit
                id={taskGroupId}
                data={data.data}
                edit={{ edit, toggleEdit }}
                mutate={mutate}
                btnSecondary={btnAction}
            />
        );
    }

    const { data: task } = data;

    return (
        <MainCard title="Task Details" secondary={<>{btnAction}</>}>
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
                                {task.name || "-"}
                            </Typography>
                        </Grid>

                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Task Group
                            </Typography>
                            <Typography variant="body2">
                                {task?.taskGroup?.name || "-"}
                            </Typography>
                        </Grid>

                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Project
                            </Typography>
                            <Typography variant="body2">
                                {task?.project?.name || "-"}
                            </Typography>
                        </Grid>

                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Begin At
                            </Typography>
                            <Typography variant="body2">
                                {task?.beginAt
                                    ? formatDate(task?.beginAt)
                                    : "-"}
                            </Typography>
                        </Grid>

                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Finish At
                            </Typography>
                            <Typography variant="body2">
                                {task?.finishAt
                                    ? formatDate(task?.finishAt)
                                    : "-"}
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
                    <Typography variant="body2">{task.description}</Typography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default TaskDetailsView;
