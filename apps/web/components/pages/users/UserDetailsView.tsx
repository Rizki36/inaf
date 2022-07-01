import MainCard from "@/components/ui-component/cards/MainCard";
import ErrorCard from "@/components/ui/ErrorCard";
import LoadingCard from "@/components/ui/LoadingCard";
import { gridSpacing } from "@/configs/constant";
import { useUserDetails } from "@/libs/query/userQuery";
import { Button, Grid, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import UserDetailsEdit from "./UserDetailsEdit";

interface UserDetailsViewProps {
    userId: string;
}

const UserDetailsView = (props: UserDetailsViewProps) => {
    const { userId } = props;

    const [edit, setEdit] = useState(false);
    const toggleEdit = useCallback(() => setEdit(!edit), [edit]);

    /** hook destruction to get data user details */
    const { data, isError, isLoading, mutate } = useUserDetails({
        id: userId,
    });

    /** button edit or cancel edit */
    const btnAction = useMemo(() => {
        return (
            <Button onClick={toggleEdit}>
                {edit ? "Cancel Edit" : "Edit"}
            </Button>
        );
    }, [edit, toggleEdit]);

    if (isLoading) return <LoadingCard />;
    if (isError) return <ErrorCard />;

    if (edit) {
        return (
            <UserDetailsEdit
                id={userId}
                data={data.data}
                edit={{ edit, toggleEdit }}
                mutate={mutate}
                btnSecondary={btnAction}
            />
        );
    }

    const { data: user } = data;

    return (
        <MainCard title="User Details" secondary={<>{btnAction}</>}>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={6} xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Name
                            </Typography>
                            <Typography variant="body2">
                                {user.name || "-"}
                            </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Username
                            </Typography>
                            <Typography variant="body2">
                                {user.username || "-"}
                            </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Email
                            </Typography>
                            <Typography variant="body2">
                                {user.email || "-"}
                            </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Position
                            </Typography>
                            <Typography variant="body2">
                                {user?.Position?.name || "-"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                    >
                        Description
                    </Typography>
                    <Typography variant="body2">{user.description}</Typography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UserDetailsView;
