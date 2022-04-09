import UserDetailsEdit from "@/components/pages/users/UserDetailsEdit";
import UserDetailsView from "@/components/pages/users/UserDetailsView";
import { useUserDetails } from "@/libs/query/userQuery";
import { Page } from "@/types/index";
import { Button, Grid } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import RunningProjectCard from "@/components/pages/users/widgets/RunningProjectCard";
import { gridSpacing } from "@/configs/constant";
import TodoListCard from "@/components/pages/users/widgets/TodoListCard";

const UserDetails: Page = () => {
    const router = useRouter();
    const { id } = router.query;
    const [edit, setEdit] = useState(false);
    const toggleEdit = useCallback(() => setEdit(!edit),[edit]);
    const { data, isError, isLoading, mutate } = useUserDetails({
        id: id as string,
    });

    const btnSecondary = useMemo(() => {
        if (edit) {
            return <Button onClick={toggleEdit}>Cancel Edit</Button>;
        } else {
            return <Button onClick={toggleEdit}>Edit</Button>;
        }
    }, [edit, toggleEdit]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={12} sm={12} xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <RunningProjectCard isLoading={false} />
                    </Grid>
                    <Grid item xs={12}>
                        <TodoListCard isLoading={false} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12}>
                {isLoading && <>Loading</>}
                {isError && <>Error</>}

                {data &&
                    (edit ? (
                        <UserDetailsEdit
                            id={id as string}
                            data={data.data}
                            edit={{ edit, toggleEdit }}
                            mutate={mutate}
                            btnSecondary={btnSecondary}
                        />
                    ) : (
                        <UserDetailsView
                            data={data.data}
                            btnSecondary={btnSecondary}
                        />
                    ))}
            </Grid>
        </Grid>
    );
};

export default UserDetails;
