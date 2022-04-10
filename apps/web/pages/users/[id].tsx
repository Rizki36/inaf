import UserDetailsView from "@/components/pages/users/UserDetailsView";
import { Page } from "@/types/index";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import RunningProjectCard from "@/components/pages/users/widgets/RunningProjectCard";
import { gridSpacing } from "@/configs/constant";
import TodoListCard from "@/components/pages/users/widgets/TodoListCard";

const UserDetails: Page = () => {
    const router = useRouter();
    const { id } = router.query;

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
                <UserDetailsView userId={id as string} />
            </Grid>
        </Grid>
    );
};

export default UserDetails;
