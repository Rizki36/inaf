import { EditProp, Inputs } from "@/types/index";
import { Button, TextField, Grid } from "@mui/material";
import { updateProjectDetailsBody, getProjectDetailsDTO } from "server";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useMemo } from "react";
import { patchProjectDetails } from "@/libs/mutation/projectMutation";
import { commonError } from "@/helpers/errorHandler";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MainCard from "@/components/ui-component/cards/MainCard";
import { gridSpacing } from "@/configs/constant";

interface IForm extends updateProjectDetailsBody {}

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

interface ProjectDetailsEditProps {
    id: string;
    data: getProjectDetailsDTO;
    edit: EditProp;
    mutate: any;
    btnSecondary: React.ReactNode;
}
const ProjectDetailsEdit = (props: ProjectDetailsEditProps) => {
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
            description: data.description,
        },
    });

    const onSubmit: SubmitHandler<IForm> = useCallback(
        (props) => {
            const body = {
                ...props,
            };

            patchProjectDetails({
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
        <MainCard title="Project Details" secondary={<>{BtnSecondary}</>}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
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

export default ProjectDetailsEdit;
