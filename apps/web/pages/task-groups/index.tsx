import useModal from "hooks/useModal";
import { Button } from "@mui/material";
import { IconPlus } from "@tabler/icons";
import { useTaskGroups } from "libs/query/taskGroupQuery";
import { Page, RowsState } from "@/types/index";
import { useEffect, useState } from "react";

/** components */
import MainCard from "@/components/ui/MainCard";
import TaskGroupTable from "@/components/pages/task-groups/TaskGroupTable";
import TaskGroupCreateModal from "@/components/pages/task-groups/TaskGroupCreateModal";

const TaskGroups: Page = () => {
    const modal = useModal(false);

    const [rowsState, setRowsState] = useState<RowsState>({
        page: 0,
        pageSize: 40,
        rows: [],
        loading: false,
        rowCount: 0,
        sort: [{ field: "name", sort: "asc" }],
    });

    const { data, isError, isLoading, mutate } = useTaskGroups({
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
            const rows = data.data.map((tg) => ({
                id: tg.id,
                name: tg.name,
                description: tg.description,
                project: tg.project?.name,
            }));

            setRowsState((prev) => ({
                ...prev,
                rows,
                loading: false,
                rowCount: data.totalRows,
            }));
        }
    }, [data, isError, isLoading]);

    return (
        <div className="w-full">
            <MainCard
                title="Task Groups"
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
                <TaskGroupTable
                    rowsState={rowsState}
                    setRowsState={setRowsState}
                    mutate={mutate}
                />
            </MainCard>

            {modal.isOpen && (
                <TaskGroupCreateModal modal={modal} mutate={mutate} />
            )}
        </div>
    );
};

export default TaskGroups;
