import {
    Button,
    CardContent,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { IconPlus, IconPencil } from "@tabler/icons";
import { useTeamsByPorject } from "@/libs/query/teamQuery";
import MainCard from "@/components/ui-component/cards/MainCard";
import { gridSpacing } from "@/configs/constant";
import AnimateButton from "@/components/ui-component/extended/AnimateButton";
import ProjectTeamsDeleteDialog from "./ProjectTeamsDeleteDialog";
import ProjectTeamsCreateModal from "./ProjectTeamsCreateModal";
import useModal from "hooks/useModal";
import ProjectTeamsUpdateModal from "./ProjectTeamsUpdateModal";
import LoadingCard from "@/components/ui/LoadingCard";
import ErrorCard from "@/components/ui-component/ErrorCard";

interface IProjectsTeamsTableProps {
    projectId: string;
}

const ProjectsTeamsTable = (props: IProjectsTeamsTableProps) => {
    const { projectId } = props;

    const [teamUpdate, setTeamUpdate] = useState<{
        userId: string;
        positionId: string;
    } | null>(null);

    /** modal create team */
    const stateModalCreate = useModal(false);

    /** modal update team */
    const stateModalUpdate = useModal(false);

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
                positionId: i.position.id,
                userId: i.user.id,
            };
        });
    }, [data, isError, isLoading]);

    if (isLoading) return <LoadingCard />;
    if (isError) return <ErrorCard />;

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
                                            onClick={
                                                stateModalCreate.toggleModal
                                            }
                                        >
                                            Add
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <DataGrid
                                autoHeight
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
                                            console.log(params);
                                            return (
                                                <>
                                                    <IconButton
                                                        aria-label="edit"
                                                        size="small"
                                                        onClick={() => {
                                                            setTeamUpdate({
                                                                positionId:
                                                                    params.row
                                                                        .positionId,
                                                                userId: params
                                                                    .row.userId,
                                                            });
                                                            stateModalUpdate.toggleModal();
                                                        }}
                                                    >
                                                        <IconPencil fontSize="small" />
                                                    </IconButton>

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
                modal={stateModalCreate}
                mutate={mutate}
            />

            {!!stateModalUpdate.isOpen && (
                <ProjectTeamsUpdateModal
                    projectId={projectId}
                    teamUpdate={teamUpdate}
                    modal={stateModalUpdate}
                    mutate={mutate}
                />
            )}
        </>
    );
};

export default ProjectsTeamsTable;
