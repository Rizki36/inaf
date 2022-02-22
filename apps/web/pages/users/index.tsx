import UsersTable from "@/components/pages/users/UsersTable";
import MainCard from "@/components/ui-component/cards/MainCard";
import { Page, RowsState } from "@/types/index";
import { Button } from "@mui/material";
import { getUsers, useUsers } from "libs/query/userQuery";
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

    const { data, isError, isLoading, mutate } = useUsers({
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
                rows: data.data.data,
                rowCount: data.data.totalRows,
            }));
        }

        if (isError && !isLoading) {
            alert("Error");
        }
    }, [data, isError, isLoading]);

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
                <UsersTable
                    rowsState={rowsState}
                    setRowsState={setRowsState}
                    mutate={mutate}
                />
            </MainCard>
        </div>
    );
};

export default Users;
