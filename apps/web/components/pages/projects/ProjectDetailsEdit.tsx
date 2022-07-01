import { Button, Grid } from "@mui/material";
import MainCard from "@/components/ui-component/cards/MainCard";
import ControlledTextField from "@/components/ui/ControlledTextField";

import * as yup from "yup";
import { ReactNode } from "react";
import { commonError } from "@/helpers/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { gridSpacing } from "@/configs/constant";
import { EditProp, Inputs } from "@/types/index";
import { patchProjectDetails } from "@/libs/mutation/projectMutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateProjectDetailsBody, getProjectDetailsDTO } from "server";

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
    btnSecondary: ReactNode;
}
const ProjectDetailsEdit = (props: ProjectDetailsEditProps) => {
    const {
        id,
        data,
        edit: { toggleEdit },
        mutate,
        btnSecondary,
    } = props;

    const { control, handleSubmit } = useForm<IForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: data.name,
            description: data.description,
        },
    });

    const onSubmit: SubmitHandler<IForm> = (props) => {
        patchProjectDetails({
            id,
            body: { ...props },
        })
            .then(() => {
                mutate();
                toggleEdit();
            })
            .catch(commonError);
    };

    return (
        <MainCard title="Project Details" secondary={<>{btnSecondary}</>}>
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

export default ProjectDetailsEdit;
