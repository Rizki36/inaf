import { deleteTaskWorker } from "@/libs/mutation/taskWorkerMutation";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

interface TaskDeleteDialogProps {
    id: string;
    name: string;
    mutate: any;
}
const TaskWorkerDeleteDialog = (props: TaskDeleteDialogProps) => {
    const { id, name, mutate } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        deleteTaskWorker({
            id,
        })
            .then(() => {
                mutate();
            })
            .catch((e) => console.log(e))
            .finally(() => setOpen(false));
    };

    return (
        <div>
            <Button
                onClick={handleClickOpen}
                variant="outlined"
                color="secondary"
                size="small"
            >
                Remove
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Confirmation !"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete this task Worker : <b>{name}</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm}>Yes</Button>
                    <Button onClick={handleClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default React.memo(TaskWorkerDeleteDialog);
