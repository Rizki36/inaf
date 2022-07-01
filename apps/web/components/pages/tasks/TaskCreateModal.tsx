import * as yup from "yup";
import { Inputs } from "@/types/index";
import { AxiosError } from "axios";
import { createTask } from "@/libs/mutation/taskMutation";
import { useProjects } from "@/libs/query/projectQuery";
import { gridSpacing } from "@/configs/constant";
import { commonError } from "@/helpers/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTaskGroups } from "@/libs/query/taskGroupQuery";
import { createTaskBody } from "server";
import { IOption, IUseModal } from "@/types/index";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, Grid, Typography } from "@mui/material";
import { getOptionsFromPaginationQuery } from "@/helpers/inputHelper";

/** components */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ControlledTextField from "@/components/ui-component/ControlledTextField";
import ControlledDatePicker from "@/components/ui-component/ControlledDatePicker";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";

interface IProps {
    modal: IUseModal;
    mutate: any;
    projectId?: string;
}

interface IForm extends Omit<createTaskBody, "attachment"> {}

const inputs: Inputs<IForm> = {
    name: {
        label: "Name",
        name: "name",
    },
    projectId: {
        label: "Project",
        name: "projectId",
    },
    beginAt: {
        label: "Begin At",
        name: "beginAt",
    },
    finishAt: {
        label: "Finish At",
        name: "finishAt",
    },
    taskGroupId: {
        label: "Task Group",
        name: "taskGroupId",
    },
    description: {
        label: "Description",
        name: "description",
    },
};

const schema = yup
    .object<Record<keyof IForm, any>>({
        name: yup.string().required().label(inputs.name.label),
        description: yup
            .string()
            .required()
            .nullable()
            .label(inputs.description.label),
        projectId: yup.string().label(inputs.projectId.label),
        beginAt: yup.date().nullable().label(inputs.beginAt.label),
        finishAt: yup
            .date()
            .nullable()
            .label(inputs.finishAt.label)
            .when("beginAt", (beginAt, schema) =>
                beginAt
                    ? schema.min(beginAt, "Begin At must be before Finish At")
                    : schema
            ),
        taskGroupId: yup.string().label(inputs.taskGroupId.label),
    })
    .required();

const TaskCreateModal = (props: IProps) => {
    const { modal, mutate } = props;

    const [errMsg, setErrMsg] = useState<string | null>(null);

    const [projectOptions, setProjectOptions] = useState<IOption[]>([]);
    const [taskGroupOptions, setTaskGroupOptions] = useState<IOption[]>([]);

    const {
        data: projects,
        isError: isErrorProject,
        isLoading: isLoadingProject,
    } = useProjects({
        page: 0,
        perPage: 40,
        enableFetch: !props?.projectId,
    });

    const {
        data: taskGroups,
        isError: isErrorTaskGroup,
        isLoading: isLoadingTaskGroup,
    } = useTaskGroups({
        page: 0,
        perPage: 40,
    });

    const { control, handleSubmit } = useForm<IForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            beginAt: null,
            finishAt: null,
            projectId: props?.projectId,
        },
    });

    useEffect(() => {
        /** get task groups options */
        const options = getOptionsFromPaginationQuery<
            typeof projects["data"][number]
        >({
            label: "name",
            value: "id",
            isError: isErrorProject,
            isLoading: isLoadingProject,
            data: projects,
        });

        setProjectOptions(options);
    }, [isErrorProject, isLoadingProject, projects]);

    useEffect(() => {
        /** get task groups options */
        const options = getOptionsFromPaginationQuery<
            typeof taskGroups["data"][number]
        >({
            label: "name",
            value: "id",
            isError: isErrorTaskGroup,
            isLoading: isLoadingTaskGroup,
            data: taskGroups,
        });

        setTaskGroupOptions(options);
    }, [isErrorTaskGroup, isLoadingTaskGroup, taskGroups]);

    const handleCancel = () => {
        modal.toggleModal();
    };

    const onSubmit: SubmitHandler<IForm> = (props) => {
        createTask({
            body: {
                ...props,
                attachment: {}, // TODO : create input for attachment
            },
        })
            .then(() => {
                mutate();
                modal.toggleModal();
            })
            .catch((err: AxiosError) => {
                setErrMsg(commonError(err));
            });
    };

    return (
        <Dialog
            open={modal.isOpen}
            onClose={modal.toggleModal}
            maxWidth="md"
            fullWidth={true}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>
                    <Typography variant="h3" fontWeight={"bolder"}>
                        Create New Task
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={6} xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <ControlledTextField
                                        control={control}
                                        name={inputs.name.name}
                                        label={inputs.name.label}
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <ControlledAutocomplete
                                        name={inputs.taskGroupId.name}
                                        label={inputs.taskGroupId.label}
                                        control={control}
                                        options={taskGroupOptions}
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    {!props?.projectId && (
                                        <ControlledAutocomplete
                                            name={inputs.projectId.name}
                                            label={inputs.projectId.label}
                                            control={control}
                                            options={projectOptions}
                                        />
                                    )}
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <ControlledDatePicker
                                        control={control}
                                        label={inputs.beginAt.label}
                                        name={inputs.beginAt.name}
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <ControlledDatePicker
                                        control={control}
                                        label={inputs.finishAt.label}
                                        name={inputs.finishAt.name}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <ControlledTextField
                                    control={control}
                                    name={inputs.description.name}
                                    label={inputs.description.label}
                                    margin="normal"
                                    variant="outlined"
                                    multiline
                                    minRows={10}
                                />
                            </Grid>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            {!!errMsg && (
                                <Alert severity="error">{errMsg}</Alert>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: "16px" }}>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button
                        variant={"contained"}
                        color="secondary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TaskCreateModal;
