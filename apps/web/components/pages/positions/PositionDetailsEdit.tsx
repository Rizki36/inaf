import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { gridSpacing } from "@/configs/constant";
import { commonError } from "@/helpers/errorHandler";
import { Button, Grid } from "@mui/material";
import { EditProp, Inputs } from "@/types/index";
import { useMemo, ReactNode } from "react";
import { patchPositionDetails } from "@/libs/mutation/positionMutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { updatePositionBody, getPositionDetailsDTO } from "server";

/** components */
import MainCard from "@/components/ui-component/cards/MainCard";
import ControlledTextField from "@/components/ui/ControlledTextField";

interface IForm extends updatePositionBody {}

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

interface PositionDetailsEditProps {
    id: string;
    data: getPositionDetailsDTO;
    edit: EditProp;
    mutate: any;
    btnSecondary: ReactNode;
}
const PostionDetailsEdit = (props: PositionDetailsEditProps) => {
    const {
        id,
        data,
        edit: { edit, toggleEdit },
        mutate,
    } = props;

    const { control, handleSubmit } = useForm<IForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: data.name,
            description: data.description,
        },
    });

    const onSubmit: SubmitHandler<IForm> = (props) => {
        const body = {
            ...props,
        };

        patchPositionDetails({
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

    return (
        <MainCard title="Position Details" secondary={<>{BtnSecondary}</>}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <ControlledTextField
                            control={control}
                            name={inputs.name.name}
                            label={inputs.name.label}
                        />

                        <ControlledTextField
                            control={control}
                            name={inputs.description.name}
                            label={inputs.description.label}
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
