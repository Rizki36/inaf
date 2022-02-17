import UsersTable from "@/components/pages/users/UsersTable";
import { Page, RowsState } from "@/types/index";
import { Card, CardContent, Typography } from "@mui/material";
import { getUsers } from "libs/query/userQuery";
import { useEffect, useState } from "react";

const Users: Page = () => {
    const [rowsState, setRowsState] = useState<RowsState>({
        page: 0,
        pageSize: 40,
        rows: [],
        loading: false,
        rowCount: 0,
        sort: [
            { field: 'name', sort: 'asc' },
        ]
    });

    useEffect(() => {
        let active = true;

        (async () => {
            setRowsState((prev) => ({ ...prev, loading: true }));
            const res = await getUsers({
                page: rowsState.page,
                perPage: rowsState.pageSize,
                sortPage: {
                    field: rowsState.sort[0]?.field,
                    sort: rowsState.sort[0]?.sort,
                }
            })

            if (!active) return;

            setRowsState((prev) => ({ ...prev, loading: false, rows: res.data, rowCount: res.totalRows }));
        })();

        return () => {
            active = false;
        }
    }, [rowsState.page, rowsState.pageSize, rowsState.sort]);

    return (
        <div className="w-full">
            <Typography variant="h4" className="my-10">
                Users
            </Typography>
            <Card>
                <CardContent>
                    <UsersTable rowsState={rowsState} setRowsState={setRowsState} />
                </CardContent>
            </Card>
        </div>
    );
};

export default Users;
