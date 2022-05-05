import { gridSpacing } from "@/configs/constant";
import { getOptionsFromPaginationQuery } from "@/helpers/inputHelper";
import { useUsers } from "@/libs/query/userQuery";
import { Inputs, IOption, IUseModal } from "@/types/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

/** components */
import ControlledAutocomplete from "@/components/ui-component/ControlledAutocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTaskWorker } from "@/libs/mutation/taskWorkerMutation";

interface IProps {
    taskId: string;
    modal: IUseModal;
    mutate: any;
    existingWorkerIds?: string[];
}

interface IForm {
    userId: string;
}

const inputs: Inputs<IForm> = {
    userId: {
        label: "User",
        name: "userId",
    },
};

const schema = yup
    .object<Record<keyof IForm, any>>({
        userId: yup.string().label(inputs.userId.label),
    })
    .required();

const TaskWorkerCreateModal = (props: IProps) => {
    const { modal, mutate, existingWorkerIds } = props;

    const [errMsg, setErrMsg] = useState<string | null>(null);

    const [userOptions, setUserOptions] = useState<IOption[]>([]);

    const {
        data: users,
        isError: isErrorUser,
        isLoading: isLoadingUser,
    } = useUsers({
        page: 0,
        perPage: 40,
    });

    const { control, handleSubmit } = useForm<IForm>({
        resolver: yupResolver(schema),
        defaultValues: {},
    });

    useEffect(() => {
        /** get task groups options */
        const options = getOptionsFromPaginationQuery<
            typeof users["data"][number]
        >({
            label: "name",
            value: "id",
            isError: isErrorUser,
            isLoading: isLoadingUser,
            data: users,
        });

        /** show only users not in task */
        const optionFiltered = options.filter((item) => {
            return !existingWorkerIds?.find((id) => id === item.value);
        });

        setUserOptions(optionFiltered);
    }, [isErrorUser, isLoadingUser, users, existingWorkerIds]);

    const handleCancel = () => {
        modal.toggleModal();
    };

    const onSubmit: SubmitHandler<IForm> = ({ userId }) => {
        createTaskWorker({
            body: {
                taskId: props.taskId,
                userId,
            },
        })
            .then(() => {
                mutate();
                modal.toggleModal();
            })
            .catch((e) => {
                setErrMsg(e.message);
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
                <DialogTitle>Add Task Worker</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <ControlledAutocomplete
                                name={inputs.userId.name}
                                label={inputs.userId.label}
                                control={control}
                                options={userOptions}
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

export default TaskWorkerCreateModal;
