import { Inputs } from "@/types/index";
import { Box, Button, Card, CardContent, TextField } from "@mui/material";
import { getUserDetailsDTO } from "server";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCallback } from "react";

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
    data: getUserDetailsDTO;
}
const UserDetailsEdit = (props: UserDetailsEditProps) => {
    const {
        data: { data },
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

    const onSubmit: SubmitHandler<IForm> = useCallback((props) => {
        console.log(props);
    }, []);

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        display={"flex"}
                        rowGap={5}
                        columnGap={10}
                        flexWrap={"wrap"}
                        justifyContent={"space-between"}
                        paddingY={5}
                        paddingX={7}
                    >
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
                        <Controller
                            control={control}
                            name={inputs.password.name}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={inputs.password.label}
                                    className="w-full"
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
                    </Box>

                    <Button type="submit" variant="contained">
                        Update
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default UserDetailsEdit;
