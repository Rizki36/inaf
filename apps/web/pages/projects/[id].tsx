import ProjectDetailsEdit from "@/components/pages/projects/ProjectDetailsEdit";
import ProjectDetailsView from "@/components/pages/projects/ProjectDetailsView";
import { useProjectDetails } from "@/libs/query/projectQuery";
import { Page } from "@/types/index";
import { Button, Grid } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { gridSpacing } from "@/configs/constant";
import AttachmentListCard from "@/components/pages/projects/widgets/AttachmentListCard";
import ProjectsTeamsTable from "@/components/pages/projects/ProjectTeamsTable";

const ProjectDetails: Page = () => {
    const router = useRouter();
    const { id } = router.query;

    /** state and function for edit component */
    const [edit, setEdit] = useState(false);
    const toggleEdit = useCallback(() => setEdit(!edit), [edit]);

    /** hook destruction to get data project details */
    const { data, isError, isLoading, mutate } = useProjectDetails({
        id: id as string,
    });

    /** button edit or cancel edit */
    const btnAction = useMemo(() => {
        if (edit) {
            return <Button onClick={toggleEdit}>Cancel Edit</Button>;
        } else {
            return <Button onClick={toggleEdit}>Edit</Button>;
        }
    }, [edit, toggleEdit]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={12} sm={12} xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <AttachmentListCard isLoading={false} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        {isLoading && <>Loading</>}
                        {isError && <>Error</>}

                        {data &&
                            (edit ? (
                                <ProjectDetailsEdit
                                    id={id as string}
                                    data={data.data}
                                    edit={{ edit, toggleEdit }}
                                    mutate={mutate}
                                    btnSecondary={btnAction}
                                />
                            ) : (
                                <ProjectDetailsView
                                    data={data.data}
                                    btnSecondary={btnAction}
                                />
                            ))}
                    </Grid>
                    <Grid item xs={12}>
                        <ProjectsTeamsTable projectId={id as string} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProjectDetails;
