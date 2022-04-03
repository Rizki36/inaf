import {
    Button,
    CardContent,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { IconPlus, IconPencil } from "@tabler/icons";
import Link from "next/link";
import { useTeamsByPorject } from "@/libs/query/teamQuery";
import MainCard from "@/components/ui-component/cards/MainCard";
import { gridSpacing } from "@/configs/constant";
import AnimateButton from "@/components/ui-component/extended/AnimateButton";
import ProjectTeamsDeleteDialog from "./ProjectTeamsDeleteDialog";
import ProjectTeamsCreateModal from "./ProjectTeamsCreateModal";
import useModal from "hooks/useModal";

interface IProjectsTeamsTableProps {
    projectId: string;
}

const ProjectsTeamsTable = (props: IProjectsTeamsTableProps) => {
    const { projectId } = props;

    /** modal create team */
    const modal = useModal(false);

    const { data, isError, isLoading, mutate } = useTeamsByPorject({
        projectId,
    });

    /** table rows  */
    const rows = useMemo(() => {
        if (isError) return [];
        if (isLoading) return [];

        return data.data.map((i) => {
            return {
                id: i.user.id,
                name: i.user.name,
                position: i.position.name,
            };
        });
    }, [data, isError, isLoading]);

    if (isLoading) return <>Loading</>; // TODO : create skeleton project teams table
    if (isError) return <>Error</>; // TODO : create common error component

    return (
        <>
            <MainCard content={false}>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid
                                container
                                alignContent="center"
                                justifyContent="space-between"
                            >
                                <Grid item>
                                    <Typography variant="h4">Teams</Typography>
                                </Grid>
                                <Grid item>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            variant="outlined"
                                            startIcon={<IconPlus />}
                                            onClick={modal.toggleModal}
                                        >
                                            Add
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ height: "300px" }}>
                            <DataGrid
                                rows={rows}
                                columns={[
                                    {
                                        field: "name",
                                        headerName: "Name",
                                        width: 300,
                                    },
                                    {
                                        field: "position",
                                        headerName: "Position",
                                        width: 300,
                                    },
                                    {
                                        field: "action",
                                        headerName: "Action",
                                        sortable: false,
                                        align: "center",
                                        renderCell: (params) => {
                                            return (
                                                <>
                                                    <Link
                                                        href={`projects/${params.id}`}
                                                        passHref
                                                    >
                                                        <IconButton
                                                            aria-label="edit"
                                                            size="small"
                                                        >
                                                            <IconPencil fontSize="small" />
                                                        </IconButton>
                                                    </Link>

                                                    <ProjectTeamsDeleteDialog
                                                        projectId={projectId}
                                                        userId={
                                                            params.id as string
                                                        }
                                                        name={params.row.name}
                                                        mutate={mutate}
                                                    />
                                                </>
                                            );
                                        },
                                    },
                                ]}
                                disableColumnFilter
                                disableSelectionOnClick
                                disableDensitySelector
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>

            <ProjectTeamsCreateModal
                projectId={projectId}
                modal={modal}
                mutate={mutate}
            />
        </>
    );
};

export default ProjectsTeamsTable;
