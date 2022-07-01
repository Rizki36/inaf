import { useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { gridSpacing } from "@/configs/constants";
import { IUseModal } from "@/types/index";
import { Grid, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from "@/types/index";
import { createProjectBody } from "server";
import { createProject } from "@/libs/mutation/projectMutation";
import { commonError } from "@/helpers/errorHandler";

interface IProps {
    modal: IUseModal;
    mutate: any;
}

interface IForm extends createProjectBody {}

const inputs: Inputs<IForm> = {
    name: {
        label: "Name",
        name: "name",
    },
    description: {
        label: "Description",
        name: "description",
    },
};

const schema = yup
    .object<Record<keyof IForm, any>>({
        name: yup.string().required(),
        description: yup.string().required(),
    })
    .required();

const ProjectCreateModal = (props: IProps) => {
    const { modal, mutate } = props;

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        resolver: yupResolver(schema),
    });

    const handleCancel = useCallback(() => {
        modal.toggleModal();
    }, [modal]);

    const onSubmit: SubmitHandler<IForm> = useCallback(
        (props) => {
            const body = {
                ...props,
            };
            createProject({
                body,
            })
                .then(() => {
                    reset();
                    mutate();
                    modal.toggleModal();
                })
                .catch(commonError);
        },
        [modal, mutate, reset]
    );

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
                        Create New Project
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Controller
                                control={control}
                                name={inputs.name.name}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={inputs.name.label}
                                        fullWidth
                                        margin="normal"
                                        variant="standard"
                                        error={Boolean(
                                            errors[inputs.name.name]
                                        )}
                                        helperText={
                                            errors[inputs.name.name]
                                                ? errors[inputs.name.name]
                                                      .message
                                                : ""
                                        }
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name={inputs.description.name}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={inputs.description.label}
                                        fullWidth
                                        margin="normal"
                                        variant="standard"
                                        error={Boolean(
                                            errors[inputs.description.name]
                                        )}
                                        helperText={
                                            errors[inputs.description.name]
                                                ? errors[
                                                      inputs.description.name
                                                  ].message
                                                : ""
                                        }
                                    />
                                )}
                            />
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

export default ProjectCreateModal;
