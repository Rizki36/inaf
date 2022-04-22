import { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { gridSpacing } from "@/configs/constant";
import { IOption, IUseModal } from "@/types/index";
import { Grid, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from "@/types/index";
import { createUserBody } from "server";
import { createUser } from "@/libs/mutation/userMutation";
import { commonError } from "@/helpers/errorHandler";
import { usePositions } from "@/libs/query/positionQuery";
import ControlledAutocomplete from "@/components/ui-component/ControlledAutocomplete";
import ControlledTextField from "@/components/ui-component/ControlledTextField";

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
        email: yup.string().required().email().label("Email"),
        password: yup.string().required().label("Password"),
        username: yup.string().required().label("Username"),
        positionId: yup.string().required().label("Position"),
        description: yup.string().label("Description"),
    })
    .required();

const UserCreateModal = (props: IProps) => {
    const { modal, mutate } = props;

    const [positionOptions, setPositionOptions] = useState<IOption[]>([]);

    const {
        data: positions,
        isError: isErrorPosition,
        isLoading: isLoadingPosition,
    } = usePositions({
        page: 0,
        perPage: 40,
        // search: rowsState.search,
    });

    const { control, handleSubmit } = useForm<IForm>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!isErrorPosition && !isLoadingPosition && positions.data) {
            const options = positions.data.map((item) => {
                const option: IOption = {
                    label: item.name,
                    value: item.id,
                };

                return option;
            });

            setPositionOptions(options);
        } else {
            setPositionOptions([]);
        }
    }, [isErrorPosition, isLoadingPosition, positions]);

    const handleCancel = useCallback(() => {
        modal.toggleModal();
    }, [modal]);

    const onSubmit: SubmitHandler<IForm> = useCallback(
        (props) => {
            const body = { ...props };

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
            maxWidth="md"
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
                        <Grid item lg={6} xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <ControlledTextField
                                        control={control}
                                        name={inputs.name.name}
                                        label={inputs.name.label}
                                    />
                                </Grid>

                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <ControlledTextField
                                        control={control}
                                        name={inputs.email.name}
                                        label={inputs.email.label}
                                    />
                                </Grid>

                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <ControlledTextField
                                        control={control}
                                        name={inputs.username.name}
                                        label={inputs.username.label}
                                    />
                                </Grid>

                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <ControlledTextField
                                        type={"password"}
                                        control={control}
                                        name={inputs.password.name}
                                        label={inputs.password.label}
                                    />
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <ControlledAutocomplete
                                        name={inputs.positionId.name}
                                        label={inputs.positionId.label}
                                        control={control}
                                        options={positionOptions}
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
