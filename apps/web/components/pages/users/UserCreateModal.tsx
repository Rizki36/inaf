import { useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { gridSpacing } from "@/configs/constant";
import { IUseModal } from "@/types/index";
import { Grid, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from "@/types/index";
import { createUserBody } from "server";
import { createUser } from "@/libs/mutation/userMutation";
import { commonError } from "@/helpers/errorHandler";

interface IProps {
    modal: IUseModal;
    mutate: any;
}

interface IForm extends createUserBody {}

const inputs: Inputs<IForm> = {
    name: {
        label: "Name",
        name: "name",
    },
    description: {
        label: "Description",
        name: "description",
    },
    email: {
        label: "Email",
        name: "email",
    },
    password: {
        label: "Password",
        name: "password",
    },
    username: {
        label: "Username",
        name: "username",
    },
    positionId: {
        label: "Position",
        name: "positionId",
    },
};

const schema = yup
    .object<Record<keyof IForm, any>>({
        name: yup.string().required().label("Name"),
        email: yup.string().required().label("Email"),
        password: yup.string().required().label("Password"),
        username: yup.string().required().label("Username"),
        positionId: yup.string().required().label("Position"),
        description: yup.string().required().label("Description"),
    })
    .required();

const UserCreateModal = (props: IProps) => {
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
            createUser({
                body,
            })
                .then(() => {
                    mutate();
                    modal.toggleModal();
                })
                .catch(commonError);
        },
        [modal, mutate]
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
                        Create New User
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={6} md={12} sm={12} xs={12}>
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
                        </Grid>

                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <Controller
                                control={control}
                                name={inputs.email.name}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={inputs.email.label}
                                        fullWidth
                                        margin="normal"
                                        variant="standard"
                                        error={Boolean(
                                            errors[inputs.email.name]
                                        )}
                                        helperText={
                                            errors[inputs.email.name]
                                                ? errors[inputs.email.name]
                                                      .message
                                                : ""
                                        }
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <Controller
                                control={control}
                                name={inputs.username.name}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={inputs.username.label}
                                        fullWidth
                                        margin="normal"
                                        variant="standard"
                                        error={Boolean(
                                            errors[inputs.username.name]
                                        )}
                                        helperText={
                                            errors[inputs.username.name]
                                                ? errors[inputs.username.name]
                                                      .message
                                                : ""
                                        }
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <Controller
                                control={control}
                                name={inputs.password.name}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={inputs.password.label}
                                        fullWidth
                                        margin="normal"
                                        variant="standard"
                                        error={Boolean(
                                            errors[inputs.password.name]
                                        )}
                                        helperText={
                                            errors[inputs.password.name]
                                                ? errors[inputs.password.name]
                                                      .message
                                                : ""
                                        }
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <Controller
                                control={control}
                                name={inputs.positionId.name}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={inputs.positionId.label}
                                        fullWidth
                                        margin="normal"
                                        variant="standard"
                                        error={Boolean(
                                            errors[inputs.positionId.name]
                                        )}
                                        helperText={
                                            errors[inputs.positionId.name]
                                                ? errors[inputs.positionId.name]
                                                      .message
                                                : ""
                                        }
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item lg={6} md={12} sm={12} xs={12}>
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

export default UserCreateModal;
