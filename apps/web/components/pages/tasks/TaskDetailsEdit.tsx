import * as yup from "yup";
import { Box } from "@mui/system";
import { commonError } from "@/helpers/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { gridSpacing } from "@/configs/constant";
import { useProjects } from "@/libs/query/projectQuery";
import { Button, Grid } from "@mui/material";
import { patchTask } from "@/libs/mutation/taskMutation";
import { EditProp, Inputs, IOption } from "@/types/index";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { getTaskDetailsDTO, updateTaskBody } from "server";

/** components */
import MainCard from "@/components/ui-component/cards/MainCard";
import ControlledTextField from "@/components/ui-component/ControlledTextField";
import ControlledAutocomplete from "@/components/ui-component/ControlledAutocomplete";
import ControlledDatePicker from "@/components/ui-component/ControlledDatePicker";
import { getOptionsFromPaginationQuery } from "@/helpers/inputHelper";
import { useTaskGroups } from "@/libs/query/taskGroupQuery";

interface IForm extends Omit<updateTaskBody, "attachment"> {}

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

interface TaskDetailsEditProps {
    id: string;
    data: getTaskDetailsDTO;
    edit: EditProp;
    mutate: any;
    btnSecondary: React.ReactNode;
}
const TaskDetailsEdit = (props: TaskDetailsEditProps) => {
    const {
        id,
        data,
        edit: { edit, toggleEdit },
        mutate,
    } = props;

    const [projectOptions, setProjectOptions] = useState<IOption[]>([]);
    const [taskGroupOptions, setTaskGroupOptions] = useState<IOption[]>([]);

    const {
        data: projects,
        isError: isErrorProject,
        isLoading: isLoadingProject,
    } = useProjects({
        page: 0,
        perPage: 40,
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
            description: data.description,
            name: data.name,
            beginAt: data.beginAt,
            finishAt: data.finishAt,
            projectId: data?.project?.id,
            taskGroupId: data?.taskGroup?.id,
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

    const onSubmit: SubmitHandler<IForm> = (props) => {
        patchTask({
            id,
            body: {
                ...props,
                attachment: {},
            },
        })
            .then((res) => {
                mutate();
                toggleEdit();
            })
            .catch(commonError);
    };

    const BtnSecondary = useMemo(() => {
        if (edit) {
            return <Button onClick={toggleEdit}>Cancel Edit</Button>;
        } else {
            return <Button onClick={toggleEdit}>Edit</Button>;
        }
    }, [edit, toggleEdit]);

    if (!projectOptions.length) return <></>;

    return (
        <MainCard title="Task Details" secondary={<>{BtnSecondary}</>}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                <ControlledAutocomplete
                                    name={inputs.projectId.name}
                                    label={inputs.projectId.label}
                                    control={control}
                                    options={projectOptions}
                                />
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
                    <Grid item xs={12}>
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                            width={"100%"}
                        >
                            <Button type="submit" variant="contained">
                                Update
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default TaskDetailsEdit;
