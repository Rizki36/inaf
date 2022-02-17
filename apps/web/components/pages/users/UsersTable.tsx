import QuickSearchToolbar from "@/components/QuickSearchToolbar";
import { RowsState } from "@/types/index";
import { DataGrid } from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";

interface UserTableProps {
    rowsState: RowsState;
    setRowsState: Dispatch<SetStateAction<RowsState>>;
}

const UsersTable = (props: UserTableProps) => {
    const { rowsState, setRowsState } = props;
    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                components={{ Toolbar: QuickSearchToolbar }}
                columns={[
                    {
                        field: "name",
                        headerName: "Name",
                        width: 300,
                    },
                    {
                        field: "username",
                        headerName: "Username",
                        width: 300,
                    },
                    {
                        field: "position",
                        headerName: "Position",
                        width: 300,
                    },
                ]}
                {...rowsState}
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

export default UsersTable;
