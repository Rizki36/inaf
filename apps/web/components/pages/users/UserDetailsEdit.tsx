import { EditProp, Inputs, IOption } from "@/types/index";
import { Button, TextField, Grid, Autocomplete } from "@mui/material";
import { getUserDetailsDTO, updateUserDetailsBody } from "server";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { patchUserDetails } from "@/libs/mutation/userMutation";
import { commonError } from "@/helpers/errorHandler";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MainCard from "@/components/ui-component/cards/MainCard";
import { gridSpacing } from "@/configs/constant";
import { usePositions } from "@/libs/query/positionQuery";
import { Box } from "@mui/system";
import ControlledAutocomplete from "@/components/ui-component/ControlledAutocomplete";

interface IForm extends updateUserDetailsBody {}

const inputs: Inputs<IForm> = {
    username: {
        label: "Username",
        name: "username",
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
    positionId: {
        label: "Position",
        name: "positionId",
    },
};

const schema = yup
    .object<Record<keyof IForm, any>>({
        name: yup.string().required().label(inputs.name.label),
        email: yup.string().required().label(inputs.email.label),
        username: yup.string().required().label(inputs.username.label),
        positionId: yup.string().required().label(inputs.positionId.label),
        description: yup.string().label(inputs.description.label),
    })
    .required();

interface UserDetailsEditProps {
    id: string;
    data: getUserDetailsDTO;
    edit: EditProp;
    mutate: any;
    btnSecondary: React.ReactNode;
}
const UserDetailsEdit = (props: UserDetailsEditProps) => {
    const {
        id,
        data,
        edit: { edit, toggleEdit },
        mutate,
    } = props;

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

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            username: data.username,
            description: data.description,
            email: data.email,
            name: data.name,
            positionId: data.positionId,
        },
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

    const onSubmit: SubmitHandler<IForm> = (props) => {
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
    };

    const BtnSecondary = useMemo(() => {
        if (edit) {
            return <Button onClick={toggleEdit}>Cancel Edit</Button>;
        } else {
            return <Button onClick={toggleEdit}>Edit</Button>;
        }
    }, [edit, toggleEdit]);

    if (!positionOptions.length) return <></>;

    console.log("selected", data.positionId);
    console.log(errors);

    return (
        <MainCard title="User Details" secondary={<>{BtnSecondary}</>}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={6} md={12} sm={12} xs={12}>
                                <Controller
                                    control={control}
                                    name={inputs.name.name}
                                    defaultValue={data.name}
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
                                    name={inputs.username.name}
                                    defaultValue={data.username}
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
                                                    ? errors[
                                                          inputs.username.name
                                                      ].message
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
                                    defaultValue={data.email}
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
                            <Controller
                                control={control}
                                name={inputs.description.name}
                                defaultValue={data.name}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={inputs.description.label}
                                        fullWidth
                                        multiline
                                        margin="normal"
                                        variant="outlined"
                                        minRows={6}
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

export default UserDetailsEdit;
