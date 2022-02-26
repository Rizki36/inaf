import { EditProp, Inputs } from "@/types/index";
import { Button, TextField, Grid } from "@mui/material";
import { updatePositionDetailsBody, getPositionDetailsDTO } from "server";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useMemo } from "react";
import { patchPositionDetails } from "@/libs/mutation/positionMutation";
import { commonError } from "@/helpers/errorHandler";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MainCard from "@/components/ui-component/cards/MainCard";
import { gridSpacing } from "@/configs/constant";

interface IForm extends updatePositionDetailsBody {}

const inputs: Inputs<IForm> = {
    name: {
        label: "Name",
        name: "name",
    },
};

const schema = yup
    .object<Record<keyof IForm, any>>({
        name: yup.string().required(),
    })
    .required();

interface PositionDetailsEditProps {
    id: string;
    data: getPositionDetailsDTO;
    edit: EditProp;
    mutate: any;
    btnSecondary: React.ReactNode;
}
const PostionDetailsEdit = (props: PositionDetailsEditProps) => {
    const {
        id,
        data: { data },
        edit: { edit, toggleEdit },
        mutate,
    } = props;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: data.name,
        },
    });

    const onSubmit: SubmitHandler<IForm> = useCallback(
        (props) => {
            const body = {
                ...props,
            };

            patchPositionDetails({
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

    const BtnSecondary = useMemo(() => {
        if (edit) {
            return <Button onClick={toggleEdit}>Cancel Edit</Button>;
        } else {
            return <Button onClick={toggleEdit}>Edit</Button>;
        }
    }, [edit, toggleEdit]);

    return (
        <MainCard title="Position Details" secondary={<>{BtnSecondary}</>}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
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
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Button type="submit" variant="contained">
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default PostionDetailsEdit;