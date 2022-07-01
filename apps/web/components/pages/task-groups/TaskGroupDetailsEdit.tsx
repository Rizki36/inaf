import * as yup from "yup";
import { Box } from "@mui/system";
import { commonError } from "@/helpers/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { gridSpacing } from "@/configs/constant";
import { useProjects } from "@/libs/query/projectQuery";
import { Button, Grid } from "@mui/material";
import { patchTaskGroup } from "@/libs/mutation/taskGroupMutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { EditProp, Inputs, IOption } from "@/types/index";
import { useEffect, useMemo, useState, ReactNode } from "react";
import { getTaskGroupDetailsDTO, updateTaskGroupBody } from "server";

/** components */
import MainCard from "@/components/ui-component/cards/MainCard";
import ControlledTextField from "@/components/ui-component/ControlledTextField";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";

interface IForm extends Omit<updateTaskGroupBody, "attachment"> {}

const inputs: Inputs<IForm> = {
    name: {
        label: "Name",
        name: "name",
    },
    description: {
        label: "Description",
        name: "description",
    },
    projectId: {
        label: "Project",
        name: "projectId",
    },
};

const schema = yup
    .object<Record<keyof IForm, any>>({
        name: yup.string().required().label(inputs.name.label),
        projectId: yup.string().label(inputs.projectId.label),
        description: yup.string().label(inputs.description.label),
    })
    .required();

interface TaskGroupDetailsEditProps {
    id: string;
    data: getTaskGroupDetailsDTO;
    edit: EditProp;
    mutate: any;
    btnSecondary: ReactNode;
}
const TaskGroupDetailsEdit = (props: TaskGroupDetailsEditProps) => {
    const {
        id,
        data,
        edit: { edit, toggleEdit },
        mutate,
    } = props;

    const [projectOptions, setProjectOptions] = useState<IOption[]>([]);

    const {
        data: projects,
        isError: isErrorProject,
        isLoading: isLoadingProject,
    } = useProjects({
        page: 0,
        perPage: 40,
    });

    const { control, handleSubmit } = useForm<IForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            description: data.description,
            name: data.name,
            projectId: data.project.id,
        },
    });

    useEffect(() => {
        if (!isErrorProject && !isLoadingProject && projects.data) {
            const options = projects.data.map((item) => {
                const option: IOption = {
                    label: item.name,
                    value: item.id,
                };

                return option;
            });

            setProjectOptions(options);
        } else {
            setProjectOptions([]);
        }
    }, [isErrorProject, isLoadingProject, projects]);

    const onSubmit: SubmitHandler<IForm> = (props) => {
        patchTaskGroup({
            id,
            body: {
                ...props,
                attachment: {},
            },
        })
            .then(() => {
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
        <MainCard title="Task Group Details" secondary={<>{BtnSecondary}</>}>
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

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <ControlledAutocomplete
                                    name={inputs.projectId.name}
                                    label={inputs.projectId.label}
                                    control={control}
                                    options={projectOptions}
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
                                minRows={6}
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

export default TaskGroupDetailsEdit;
