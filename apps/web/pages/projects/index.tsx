import ProjectsTable from "@/components/pages/projects/ProjectsTable";
import MainCard from "@/components/ui/MainCard";
import { Page, RowsState } from "@/types/index";
import { Button } from "@mui/material";
import { useProjects } from "libs/query/projectQuery";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons";
import useModal from "hooks/useModal";
import ProjectCreateModal from "@/components/pages/projects/ProjectCreateModal";

const Projects: Page = () => {
    const modal = useModal(false);

    const [rowsState, setRowsState] = useState<RowsState>({
        page: 0,
        pageSize: 40,
        rows: [],
        loading: false,
        rowCount: 0,
        sort: [{ field: "name", sort: "asc" }],
    });

    const { data, isError, isLoading, mutate } = useProjects({
        page: rowsState.page,
        perPage: rowsState.pageSize,
        sortPage: {
            field: rowsState.sort[0]?.field,
            sort: rowsState.sort[0]?.sort,
        },
        search: rowsState.search,
    });

    useEffect(() => {
        if (data?.data && !isLoading) {
            setRowsState((prev) => ({
                ...prev,
                loading: false,
                rows: data.data,
                rowCount: data.totalRows,
            }));
        }
    }, [data, isError, isLoading]);

    return (
        <div className="w-full">
            <MainCard
                title="Projects"
                secondary={
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<IconPlus />}
                        onClick={modal.toggleModal}
                    >
                        Add
                    </Button>
                }
            >
                <ProjectsTable
                    rowsState={rowsState}
                    setRowsState={setRowsState}
                    mutate={mutate}
                />
            </MainCard>
            <ProjectCreateModal modal={modal} mutate={mutate} />
        </div>
    );
};

export default Projects;
