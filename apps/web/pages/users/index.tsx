import UsersTable from "@/components/pages/users/UsersTable";
import MainCard from "@/components/ui-component/cards/MainCard";
import { Page, RowsState } from "@/types/index";
import { Button } from "@mui/material";
import { getUsers } from "libs/query/userQuery";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons";

const Users: Page = () => {
    const [rowsState, setRowsState] = useState<RowsState>({
        page: 0,
        pageSize: 40,
        rows: [],
        loading: false,
        rowCount: 0,
        sort: [{ field: "name", sort: "asc" }],
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
                },
                search: rowsState.search,
            });

            if (!active) return;

            setRowsState((prev) => ({
                ...prev,
                loading: false,
                rows: res.data,
                rowCount: res.totalRows,
            }));
        })();

        return () => {
            active = false;
        };
    }, [rowsState.page, rowsState.pageSize, rowsState.sort, rowsState.search]);

    return (
        <div className="w-full">
            <MainCard
                title="Users"
                secondary={
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<IconPlus />}
                    >
                        Add
                    </Button>
                }
            >
                <UsersTable rowsState={rowsState} setRowsState={setRowsState} />
            </MainCard>
        </div>
    );
};

export default Users;
