import * as yup from "yup";
import { Inputs } from "@/types/index";
import { createTaskGroup } from "@/libs/mutation/taskGroupMutation";
import { gridSpacing } from "@/configs/constant";
import { commonError } from "@/helpers/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTaskGroupBody } from "server";
import { Grid, Typography } from "@mui/material";
import { IOption, IUseModal } from "@/types/index";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

/** components */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ControlledAutocomplete from "@/components/ui-component/ControlledAutocomplete";
import ControlledTextField from "@/components/ui-component/ControlledTextField";
import { useProjects } from "@/libs/query/projectQuery";

interface IProps {
    modal: IUseModal;
    mutate: any;
}

interface IForm extends Omit<createTaskGroupBody, "attachment"> {}

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
        label: "Project (Optional)",
        name: "projectId",
    },
};

const schema = yup
    .object<Record<keyof IForm, any>>({
        name: yup.string().required().label(inputs.name.label),
        description: yup.string().required().label(inputs.description.label),
        projectId: yup.string().required().label(inputs.projectId.label),
    })
    .required();

const TaskGroupCreateModal = (props: IProps) => {
    const { modal, mutate } = props;

    const [projectOptions, setProjectOptions] = useState<IOption[]>([]);

    const {
        data: projects,
        isError: isErrorProject,
        isLoading: isLoadingProject,
    } = useProjects({
        page: 0,
        perPage: 40,
        // search: rowsState.search,
    });

    const { control, handleSubmit } = useForm<IForm>({
        resolver: yupResolver(schema),
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

    const handleCancel = () => {
        modal.toggleModal();
    };

    const onSubmit: SubmitHandler<IForm> = (props) => {
        createTaskGroup({
            body: {
                ...props,
                attachment: {}, // TODO : create input for attachment
            },
        })
            .then(() => {
                mutate();
                modal.toggleModal();
            })
            .catch(commonError);
    };

    return (
        <Dialog
            open={modal.isOpen}
            onClose={modal.toggleModal}
            maxWidth="sm"
            fullWidth={true}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>
                    <Typography variant="h3" fontWeight={"bolder"}>
                        Create New Task Group
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

export default TaskGroupCreateModal;
