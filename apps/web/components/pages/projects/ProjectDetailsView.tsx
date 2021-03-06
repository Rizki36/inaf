import MainCard from "@/components/ui/MainCard";
import ErrorCard from "@/components/ui/ErrorCard";
import LoadingCard from "@/components/ui/LoadingCard";
import { gridSpacing } from "@/configs/constants";
import { useProjectDetails } from "@/libs/query/projectQuery";
import { Button, Grid, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import ProjectDetailsEdit from "./ProjectDetailsEdit";

interface ProjectDetailsViewProps {
    projectId: string;
}

const UserDetailsView = (props: ProjectDetailsViewProps) => {
    const { projectId } = props;

    /** state and function for edit component */
    const [edit, setEdit] = useState(false);
    const toggleEdit = useCallback(() => setEdit(!edit), [edit]);

    /** hook destruction to get data project details */
    const { data, isError, isLoading, mutate } = useProjectDetails({
        id: projectId,
    });

    /** button edit or cancel edit */
    const btnAction = useMemo(() => {
        return (
            <Button onClick={toggleEdit}>
                {edit ? "Cancel Edit" : "Edit"}
            </Button>
        );
    }, [edit, toggleEdit]);

    if (isLoading) return <LoadingCard />;
    if (isError) return <ErrorCard />;

    /** component edit project details  */
    if (edit) {
        return (
            <ProjectDetailsEdit
                id={projectId}
                data={data.data}
                edit={{ edit, toggleEdit }}
                mutate={mutate}
                btnSecondary={btnAction}
            />
        );
    }

    const { name, description } = data.data;

    return (
        <MainCard title="Project Details" secondary={<>{btnAction}</>}>
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
