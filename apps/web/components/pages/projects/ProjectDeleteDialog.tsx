import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import { IconTrash } from "@tabler/icons";
import { commonError } from "@/helpers/errorHandler";
import { deleteProject } from "@/libs/mutation/projectMutation";

interface ProjectDeleteDialogProps {
    id: string;
    name: string;
    mutate: any;
}
const ProjectDeleteDialog = (props: ProjectDeleteDialogProps) => {
    const { id, name, mutate } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        deleteProject({
            id,
        })
            .then(() => {
                mutate();
            })
            .catch((error) => commonError(error))
            .finally(() => {
                setOpen(false);
            });
    };

    return (
        <div>
            <IconButton
                aria-label="delete"
                size="small"
                onClick={handleClickOpen}
            >
                <IconTrash fontSize={"small"} />
            </IconButton>

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
                        Are you sure to delete this project : <b>{name}</b>
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

export default React.memo(ProjectDeleteDialog);
