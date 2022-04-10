import { useEffect, useState } from "react";

import * as yup from "yup";
import { gridSpacing } from "@/configs/constant";
import { IOption, IUseModal } from "@/types/index";
import { Alert, Grid } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from "@/types/index";
import { createTeamBody } from "server";
import { commonError } from "@/helpers/errorHandler";

// components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { usePositions } from "@/libs/query/positionQuery";
import ControlledAutocomplete from "@/components/ui-component/ControlledAutocomplete";
import { useUsers } from "@/libs/query/userQuery";
import { getOptionsFromPaginationQuery } from "@/helpers/inputHelper";
import { updateTeam } from "@/libs/mutation/teamMutation";
import { AxiosError } from "axios";

interface IProps {
    teamUpdate: {
        userId: string;
        positionId: string;
    };
    projectId: string;
    modal: IUseModal;
    mutate: any;
}

interface IForm extends createTeamBody {}

const inputs: Inputs<Omit<IForm, "projectId">> = {
    userId: {
        label: "User",
        name: "userId",
    },
    positionId: {
        label: "Position",
        name: "positionId",
    },
};

const schema = yup
    .object<Record<keyof Omit<IForm, "projectId">, any>>({
        userId: yup.string().required(),
        positionId: yup.string().required(),
    })
    .required();

const ProjectTeamsUpdateModal = (props: IProps) => {
    const {
        modal,
        mutate,
        projectId,
        teamUpdate: { userId, positionId },
    } = props;

    const [errMsg, setErrMsg] = useState<string | null>(null);

    // options
    const [positionOptions, setPositionOptions] = useState<IOption[]>([]);
    const [userOptions, setUserOptions] = useState<IOption[]>([]);

    const { control, reset, handleSubmit } = useForm<IForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            projectId,
            userId,
            positionId,
        },
    });

    const {
        data: positions,
        isError: isErrorPosition,
        isLoading: isLoadingPosition,
    } = usePositions({
        page: 0,
        perPage: 40,
    });

    const {
        data: users,
        isError: isErrorUser,
        isLoading: isLoadingUser,
    } = useUsers({
        page: 0,
        perPage: 40,
    });

    // convert data from query to options
    useEffect(() => {
        /** get project options */
        const options = getOptionsFromPaginationQuery<
            typeof positions["data"][number]
        >({
            label: "name",
            value: "id",
            isError: isErrorPosition,
            isLoading: isLoadingPosition,
            data: positions,
        });

        setPositionOptions(options);
    }, [isErrorPosition, isLoadingPosition, positions]);

    // convert data from query to options
    useEffect(() => {
        /** get user options */
        const options = getOptionsFromPaginationQuery<
            typeof users["data"][number]
        >({
            label: "name",
            value: "id",
            isError: isErrorUser,
            isLoading: isLoadingUser,
            data: users,
        });

        setUserOptions(options);
    }, [isErrorUser, isLoadingUser, positions, users]);

    const resetForm = () => {
        reset();
        setErrMsg(null);
    };
    const handleCancel = () => {
        resetForm();
        modal.toggleModal();
    };

    const onSubmit: SubmitHandler<IForm> = ({
        positionId,
        projectId,
        userId,
    }) => {
        updateTeam({
            params: { projectId, userId },
            data: {
                positionId,
            },
        })
            .then(() => {
                mutate();
                resetForm();
                modal.toggleModal();
            })
            .catch((e: AxiosError) => {
                setErrMsg(e.response.data.message ?? "Something went wrong");
                commonError(e);
            });
    };

    return (
        <Dialog
            open={modal.isOpen}
            onClose={modal.toggleModal}
            maxWidth="sm"
            fullWidth={true}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Update Existing Team</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <ControlledAutocomplete
                                name={inputs.userId.name}
                                label={inputs.userId.label}
                                control={control}
                                options={userOptions}
                                disabled
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <ControlledAutocomplete
                                name={inputs.positionId.name}
                                label={inputs.positionId.label}
                                control={control}
                                options={positionOptions}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            {!!errMsg && (
                                <Alert severity="error">{errMsg}</Alert>
                            )}
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

export default ProjectTeamsUpdateModal;
