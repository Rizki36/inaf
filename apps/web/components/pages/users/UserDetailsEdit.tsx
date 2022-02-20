import { EditProp, Inputs } from "@/types/index";
import { Button, TextField, Grid } from "@mui/material";
import { getUserDetailsDTO } from "server";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCallback } from "react";
import { patchUserDetails } from "@/libs/mutation/userMutation";
import { commonError } from "@/helpers/errorHandler";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MainCard from "@/components/ui-component/cards/MainCard";

interface IForm extends Omit<getUserDetailsDTO["data"], "id"> {
    password?: string;
}

const inputs: Inputs<IForm> = {
    username: {
        label: "Username",
        name: "username",
    },
    password: {
        label: "Password",
        name: "password",
    },
    description: {
        label: "Description",
        name: "description",
    },
    email: {
        label: "Email",
        name: "email",
    },
    name: {
        label: "Name",
        name: "name",
    },
};

const schema = yup
    .object<Record<keyof IForm, any>>({
        username: yup.string().required(),
        password: yup.string(),
        description: yup.string().required(),
        email: yup.string().required(),
        name: yup.string().required(),
    })
    .required();

interface UserDetailsEditProps {
    id: string;
    data: getUserDetailsDTO;
    edit: EditProp;
    mutate: any;
}
const UserDetailsEdit = (props: UserDetailsEditProps) => {
    const {
        id,
        data: { data },
        edit: { toggleEdit },
        mutate,
    } = props;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            username: data.username,
            password: "",
            description: data.description,
            email: data.email,
            name: data.name,
        },
    });

    const onSubmit: SubmitHandler<IForm> = useCallback(
        (props) => {
            const body = {
                ...props,
            };

            patchUserDetails({
                id,
                body,
            })
                .then((res) => {
                    mutate();
                    toggleEdit();
                })
                .catch(commonError);
        },
        [id]
    );

    return (
        <MainCard title="User Details">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    columns={2}
                >
                    <Grid item>
                        <Controller
                            control={control}
                            name={inputs.username.name}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={inputs.username.label}
                                    className="w-full"
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
                    <Grid item>
                        <Controller
                            control={control}
                            name={inputs.name.name}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={inputs.name.label}
                                    className="w-full"
                                    margin="normal"
                                    variant="standard"
                                    error={Boolean(errors[inputs.name.name])}
                                    helperText={
                                        errors[inputs.name.name]
                                            ? errors[inputs.name.name].message
                                            : ""
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            control={control}
                            name={inputs.email.name}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={inputs.email.label}
                                    className="w-full"
                                    margin="normal"
                                    variant="standard"
                                    error={Boolean(errors[inputs.email.name])}
                                    helperText={
                                        errors[inputs.email.name]
                                            ? errors[inputs.email.name].message
                                            : ""
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            control={control}
                            name={inputs.description.name}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={inputs.description.label}
                                    className="w-full"
                                    margin="normal"
                                    variant="standard"
                                    error={Boolean(
                                        errors[inputs.description.name]
                                    )}
                                    helperText={
                                        errors[inputs.description.name]
                                            ? errors[inputs.description.name]
                                                  .message
                                            : ""
                                    }
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Button type="submit" variant="contained">
                    Update
                </Button>
            </form>
        </MainCard>
    );
};

export default UserDetailsEdit;
