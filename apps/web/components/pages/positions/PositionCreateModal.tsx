import { useCallback } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ControlledTextField from "@/components/ui-component/ControlledTextField";

import { gridSpacing } from "@/configs/constant";
import { IUseModal } from "@/types/index";
import { Grid, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from "@/types/index";
import { createPositionBody } from "server";
import { createPosition } from "@/libs/mutation/positionMutation";
import { commonError } from "@/helpers/errorHandler";

interface IProps {
    modal: IUseModal;
    mutate: any;
}

interface IForm extends createPositionBody {}

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

const PositionCreateModal = (props: IProps) => {
    const { modal, mutate } = props;

    const { control, reset, handleSubmit } = useForm<IForm>({
        resolver: yupResolver(schema),
    });

    const handleCancel = useCallback(() => {
        modal.toggleModal();
    }, [modal]);

    const onSubmit: SubmitHandler<IForm> = useCallback(
        (props) => {
            const body = {
                ...props,
            };
            createPosition({
                body,
            })
                .then(() => {
                    reset(), mutate();
                    modal.toggleModal();
                })
                .catch(commonError);
        },
        [modal, mutate, reset]
    );

    return (
        <Dialog
            open={modal.isOpen}
            onClose={modal.toggleModal}
            maxWidth="sm"
            fullWidth={true}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>
                    <Typography variant="h3" fontWeight={"bolder"}>
                        Create New Position
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
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
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: "16px" }}>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button
                        variant={"contained"}
                        color="secondary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default PositionCreateModal;
