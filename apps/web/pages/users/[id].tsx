import UserDetailsEdit from "@/components/pages/users/UserDetailsEdit";
import UserDetailsView from "@/components/pages/users/UserDetailsView";
import { useUserDetails } from "@/libs/query/userQuery";
import { Page } from "@/types/index";
import { Grid} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import RunningProjectCard from "@/components/pages/users/widgets/RunningProjectCard";
import { gridSpacing } from "@/configs/constant";
import TodoListCard from "@/components/pages/users/widgets/TodoListCard";

const UserDetails: Page = () => {
    const router = useRouter();
    const { id } = router.query;
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => setEdit(!edit);
    const { data, isError, isLoading, mutate } = useUserDetails({
        id: id as string,
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={4} sm={4} xs={4}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <RunningProjectCard isLoading={false} />
                    </Grid>
                    <Grid item xs={12}>
                        <TodoListCard isLoading={false} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={8}>
                {isLoading && <>Loading</>}
                {isError && <>Error</>}

                {data &&
                    (edit ? (
                        <UserDetailsEdit
                            id={id as string}
                            data={data.data}
                            edit={{ edit, toggleEdit }}
                            mutate={mutate}
                        />
                    ) : (
                        <UserDetailsView data={data.data} />
                    ))}
            </Grid>
        </Grid>
    );
};

export default UserDetails;
