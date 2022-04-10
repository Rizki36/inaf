import QuickSearchToolbar from "@/components/QuickSearchToolbar";
import { RowsState } from "@/types/index";
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";
import { IconEye } from "@tabler/icons";
import Link from "next/link";
import TaskDeleteDialog from "./TaskDeleteDialog";

interface TaskTableProps {
    rowsState: RowsState;
    setRowsState: Dispatch<SetStateAction<RowsState>>;
    mutate: any;
}

const TaskTable = (props: TaskTableProps) => {
    const { rowsState, setRowsState, mutate } = props;

    return (
        <div style={{ height: "60vh", width: "100%" }}>
            <DataGrid
                components={{ Toolbar: QuickSearchToolbar }}
                columns={[
                    {
                        field: "name",
                        headerName: "Name",
                        width: 300,
                    },
                    {
                        field: "project",
                        headerName: "Project",
                        width: 200,
                    },
                    {
                        field: "beginAt",
                        headerName: "Begin At",
                        width: 200,
                    },
                    {
                        field: "finishAt",
                        headerName: "Finish At",
                        width: 200,
                    },
                    {
                        field: "taskGroup",
                        headerName: "Task Group",
                        width: 200,
                    },
                    {
                        field: "description",
                        headerName: "Description",
                        width: 200,
                    },
                    {
                        field: "action",
                        headerName: "Action",
                        sortable: false,
                        align: "center",
                        renderCell: (params) => {
                            return (
                                <>
                                    <Link href={`tasks/${params.id}`} passHref>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                        >
                                            <IconEye fontSize="small" />
                                        </IconButton>
                                    </Link>

                                    <TaskDeleteDialog
                                        id={params.id as string}
                                        name={params.row.name}
                                        mutate={mutate}
                                    />
                                </>
                            );
                        },
                    },
                ]}
                {...rowsState}
                rows={rowsState.rows}
                disableColumnFilter
                disableSelectionOnClick
                disableDensitySelector
                pagination
                paginationMode="server"
                sortingMode="server"
                sortModel={rowsState?.sort}
                onPageChange={(page) =>
                    setRowsState((prev) => ({ ...prev, page }))
                }
                onSortModelChange={(sort) =>
                    setRowsState((prev) => ({ ...prev, sort }))
                }
                onPageSizeChange={(pageSize) =>
                    setRowsState((prev) => ({ ...prev, pageSize }))
                }
                componentsProps={{
                    toolbar: {
                        value: rowsState.search,
                        onChange: (
                            event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                            setRowsState((prev) => ({
                                ...prev,
                                search: event.target.value,
                            })),
                        clearSearch: () =>
                            setRowsState((prev) => ({ ...prev, search: null })),
                    },
                }}
            />
        </div>
    );
};

export default TaskTable;
