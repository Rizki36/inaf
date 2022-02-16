import { RowsState } from "@/types/index"
import { DataGrid } from "@mui/x-data-grid"
import { Dispatch, SetStateAction } from "react"

interface UserTableProps {
    rowsState: RowsState,
    setRowsState: Dispatch<SetStateAction<RowsState>>
}

const UsersTable = (props: UserTableProps) => {
    const { rowsState, setRowsState } = props
    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                columns={[
                    {
                        field: 'name',
                        headerName: 'Nama'
                    },
                    {
                        field: 'username',
                        headerName: 'Username'
                    },
                    {
                        field: 'position',
                        headerName: 'Position'
                    }
                ]}
                {...rowsState}
                pagination
                paginationMode="server"
                onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
                onPageSizeChange={(pageSize) =>
                    setRowsState((prev) => ({ ...prev, pageSize }))
                }
            />
        </div>
    )
}

export default UsersTable;