import { mapStatus } from "@/helpers/taskHelper";
import { useTasks } from "@/libs/query/taskQuery";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
    Box,
    Button,
    Chip,
    List,
    ListItem,
    ListItemText,
    Skeleton,
    Tab,
    Typography,
} from "@mui/material";
import useModal from "hooks/useModal";
import { FC, useMemo, useState } from "react";
import TaskCreateModal from "../tasks/TaskCreateModal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const TaskWidget: FC<{
    projectId: string;
}> = ({ projectId }) => {
    const {
        data: task,
        isLoading,
        isError,
        mutate,
    } = useTasks({
        page: 0,
        perPage: -1,
        projectId,
    });

    const modal = useModal(false);

    const [tab, setTab] = useState("1");

    const unDoneTask = useMemo(() => {
        return task?.data?.filter(
            (item) => item.status === "IN_PROGRESS" || item.status === "OPEN"
        );
    }, [task?.data]);

    const doneTask = useMemo(() => {
        return task?.data?.filter((item) => item.status === "DONE");
    }, [task?.data]);

    return (
        <>
            <div className="bg-white flex flex-col py-1 px-5 rounded-lg h-full">
                <div className="flex items-center justify-between">
                    <h2>Task</h2>
                    <div>
                        <Button
                            onClick={() => modal.toggleModal()}
                            variant="outlined"
                        >
                            Add
                        </Button>
                    </div>
                </div>
                <div className="h-full">
                    {!isLoading && !isError && (
                        <TabContext value={tab}>
                            <Box
                                sx={{
                                    borderBottom: 1,
                                    borderColor: "divider",
                                }}
                            >
                                <TabList
                                    onChange={(e, val) => setTab(val)}
                                    aria-label="lab API tabs example"
                                >
                                    <Tab label="Active" value="1" />
                                    <Tab label="Done" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <List
                                    sx={{
                                        width: "100%",
                                        bgcolor: "background.paper",
                                    }}
                                >
                                    {unDoneTask.map((task) => (
                                        <ListItem key={task.id} disablePadding>
                                            <ListItemText
                                                primary={task.name}
                                                secondary={
                                                    !!task.finishAt &&
                                                    `Due to ${task.finishAt}`
                                                }
                                            />
                                            <div className="flex gap-x-1">
                                                <Chip
                                                    size="small"
                                                    label={`• ${mapStatus(
                                                        task.status
                                                    )}`}
                                                    color="secondary"
                                                    variant="outlined"
                                                />
                                            </div>
                                        </ListItem>
                                    ))}
                                </List>
                            </TabPanel>
                            <TabPanel value="2">
                                <List
                                    sx={{
                                        width: "100%",
                                        bgcolor: "background.paper",
                                    }}
                                >
                                    {doneTask.map((task) => (
                                        <ListItem key={task.id} disablePadding>
                                            <ListItemText
                                                primary={task.name}
                                                secondary={
                                                    !!task.finishAt &&
                                                    `Due to ${task.finishAt}`
                                                }
                                            />
                                            <div className="flex gap-x-1">
                                                <Chip
                                                    size="small"
                                                    label={`• ${mapStatus(
                                                        task.status
                                                    )}`}
                                                    color="success"
                                                    variant="outlined"
                                                />
                                            </div>
                                        </ListItem>
                                    ))}
                                </List>
                            </TabPanel>
                        </TabContext>
                    )}

                    {isLoading && (
                        <div className="mt-5 mb-5">
                            {[...Array(5)].map((_, index) => (
                                <Skeleton
                                    key={index}
                                    animation="wave"
                                    height={40}
                                />
                            ))}
                        </div>
                    )}

                    {isError && (
                        <div className="flex flex-col h-full justify-center items-center -mt-4">
                            <ErrorOutlineIcon fontSize="large" />
                            <Typography variant="h3" mt={1} color="inherit">
                                There was an error while loading data
                            </Typography>
                        </div>
                    )}
                </div>
            </div>

            {modal.isOpen && (
                <TaskCreateModal
                    modal={modal}
                    mutate={() => mutate()}
                    projectId={projectId}
                />
            )}
        </>
    );
};

export default TaskWidget;
