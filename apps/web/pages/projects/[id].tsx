import ProjectDetailsView from "@/components/pages/projects/ProjectDetailsView";
import { Page } from "@/types/index";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { gridSpacing } from "@/configs/constant";
import AttachmentListCard from "@/components/pages/projects/widgets/AttachmentListCard";
import ProjectsTeamsTable from "@/components/pages/projects/ProjectTeamsTable";

const ProjectDetails: Page = () => {
    const router = useRouter();
    const { id } = router.query;

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
                        <ProjectDetailsView projectId={id as string} />
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
