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
import { deleteTeam } from "@/libs/mutation/teamMutation";
import { deleteTeamParams } from "server";

interface ProjectDeleteDialogProps extends deleteTeamParams {
    name: string;
    mutate: any;
}

const ProjectTeamsDeleteDialog = (props: ProjectDeleteDialogProps) => {
    const { projectId, userId, mutate, name } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        deleteTeam({
            projectId,
            userId,
        })
            .then((res) => {
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
                        Are you sure to delete user <b>{name}</b> from this
                        project ?
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

export default React.memo(ProjectTeamsDeleteDialog);
