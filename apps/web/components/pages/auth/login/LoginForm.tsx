import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Inputs } from "@/types/index";
import { loginMutation } from "@/libs/mutation/loginMutation";
import { commonError } from "helpers/errorHandler";
import { AxiosError } from "axios";
import Router from "next/router";
import { mutate } from "swr";

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
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState<string | null>(null);

    console.log(errMsg);

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

    const onSubmit: SubmitHandler<IForm> = ({ username, password }) => {
        setIsLoading(true);
        setErrMsg(null);

        loginMutation({
            username,
            password,
        })
            .then(async () => {
                // localStorage.setItem(key_token, res.data.data.accessToken);
                await mutate("account");
                Router.replace("/");
            })
            .catch((e: AxiosError) => {
                setErrMsg("Uppsss error");
                setIsLoading(false);
                commonError(e);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="submit" variant="contained" disabled={isLoading}>
                    Login
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
