import { Button, TextField, Typography } from "@mui/material";
import { useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Inputs } from "@/types/index";
import { loginMutation } from "libs/mutation/Auth";
import { commonError } from "helpers/errorHandler";
import { setUser } from "configs/redux/userSlice";
import { useAppDispatch } from "configs/redux/hooks";

interface IForm {
    username: string;
    password: string;
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
};

const schema = yup
    .object<Record<keyof IForm, any>>({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    .required();

const LoginForm = () => {
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            username: "fitra",
            password: "123456789",
        },
    });

    const onSubmit: SubmitHandler<IForm> = useCallback(
        ({ username, password }) => {
            loginMutation({
                username,
                password,
            })
                .then((res) => {
                    dispatch(setUser(res.data.data.user));
                })
                .catch((e) => commonError);
        },
        []
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" marginBottom={"20px"}>
                Login
            </Typography>
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
                        error={Boolean(errors[inputs.username.name])}
                        helperText={
                            errors[inputs.username.name]
                                ? errors[inputs.username.name].message
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
                        error={Boolean(errors[inputs.password.name])}
                        helperText={
                            errors[inputs.password.name]
                                ? errors[inputs.password.name].message
                                : ""
                        }
                    />
                )}
            />

            <div className="flex justify-center mt-10">
                <Button type="submit" variant="contained">
                    Login
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
