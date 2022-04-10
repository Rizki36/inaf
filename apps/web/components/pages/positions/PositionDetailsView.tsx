import MainCard from "@/components/ui-component/cards/MainCard";
import { gridSpacing } from "@/configs/constant";
import { usePositionDetails } from "@/libs/query/positionQuery";
import { Button, Grid, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import PostionDetailsEdit from "./PositionDetailsEdit";

interface UserDetailsViewProps {
    positionId: string;
}

const UserDetailsView = (props: UserDetailsViewProps) => {
    const { positionId } = props;

    /** state and function for edit component */
    const [edit, setEdit] = useState(false);
    const toggleEdit = useCallback(() => setEdit(!edit), [edit]);

    /** hook destruction to get data position details */
    const { data, isError, isLoading, mutate } = usePositionDetails({
        id: positionId,
    });

    /** button edit or cancel edit */
    const btnSecondary = useMemo(() => {
        return (
            <Button onClick={toggleEdit}>
                {edit ? "Cancel Edit" : "Edit"}
            </Button>
        );
    }, [edit, toggleEdit]);

    if (isLoading) return <>Loading</>; // TODO : create skeleton loading
    if (isError) return <>Error</>; // TODO : create common error component

    /** component edit position details  */
    if (edit) {
        return (
            <PostionDetailsEdit
                id={positionId}
                data={data.data}
                edit={{ edit, toggleEdit }}
                mutate={mutate}
                btnSecondary={btnSecondary}
            />
        );
    }

    const { name, description } = data.data;

    return (
        <MainCard title="Position Details" secondary={<>{btnSecondary}</>}>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div style={{ marginTop: "16px" }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Name
                        </Typography>
                        <Typography variant="body2">{name}</Typography>
                    </div>
                    <div style={{ marginTop: "16px" }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Description
                        </Typography>
                        <Typography variant="body2">{description}</Typography>
                    </div>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UserDetailsView;
