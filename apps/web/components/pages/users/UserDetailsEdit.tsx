import * as yup from "yup";
import { Box } from "@mui/system";
import { commonError } from "@/helpers/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { gridSpacing } from "@/configs/constant";
import { usePositions } from "@/libs/query/positionQuery";
import { Button, Grid } from "@mui/material";
import { patchUserDetails } from "@/libs/mutation/userMutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { EditProp, Inputs, IOption } from "@/types/index";
import { useEffect, useMemo, useState, ReactNode } from "react";
import { getUserDetailsDTO, updateUserDetailsBody } from "server";

/** components */
import MainCard from "@/components/ui-component/cards/MainCard";
import ControlledAutocomplete from "@/components/ui/ControlledAutocomplete";
import ControlledTextField from "@/components/ui-component/ControlledTextField";

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
    btnSecondary: ReactNode;
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
                                <ControlledTextField
                                    control={control}
                                    name={inputs.name.name}
                                    label={inputs.name.label}
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
                                    control={control}
                                    name={inputs.email.name}
                                    label={inputs.email.label}
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
