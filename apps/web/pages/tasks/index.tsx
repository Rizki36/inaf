import useModal from "hooks/useModal";
import { Button } from "@mui/material";
import { IconPlus } from "@tabler/icons";
import { useTasks } from "libs/query/taskQuery";
import { Page, RowsState } from "@/types/index";
import { useEffect, useState } from "react";

/** components */
import MainCard from "@/components/ui-component/cards/MainCard";
import TaskTable from "@/components/pages/tasks/TaskTable";
import TaskCreateModal from "@/components/pages/tasks/TaskCreateModal";
import { formatDate } from "@/helpers/dateHelper";

const Tasks: Page = () => {
    const modal = useModal(false);

    const [rowsState, setRowsState] = useState<RowsState>({
        page: 0,
        pageSize: 40,
        rows: [],
        loading: false,
        rowCount: 0,
        sort: [{ field: "name", sort: "asc" }],
    });

    const { data, isError, isLoading, mutate } = useTasks({
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
            const rows = data.data.map((dt) => ({
                ...dt,
                project: dt?.project?.name ?? "-",
                beginAt: dt.beginAt ? formatDate(dt.beginAt) : "-",
                finishAt: dt.finishAt ? formatDate(dt.finishAt) : "-",
                taskGroup: dt?.taskGroup?.name ?? "-",
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
                title="Task"
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
                <TaskTable
                    rowsState={rowsState}
                    setRowsState={setRowsState}
                    mutate={mutate}
                />
            </MainCard>

            {modal.isOpen && <TaskCreateModal modal={modal} mutate={mutate} />}
        </div>
    );
};

export default Tasks;
