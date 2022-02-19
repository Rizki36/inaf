import UserDetailsEdit from "@/components/pages/users/UserDetailsEdit";
import UserDetailsView from "@/components/pages/users/UserDetailsView";
import { useUserDetails } from "@/libs/query/userQuery";
import { Page } from "@/types/index";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useRouter } from "next/router";

const UserDetails: Page = () => {
    const router = useRouter();
    const { id } = router.query;
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => setEdit(!edit);
    const { data, isError, isLoading, mutate } = useUserDetails({
        id: id as string,
    });

    return (
        <div className="w-full">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" className="my-10">
                    User Details
                </Typography>
                {edit ? (
                    <div>
                        <Button onClick={toggleEdit}>Cancel Edit</Button>
                    </div>
                ) : (
                    <div>
                        <Button onClick={toggleEdit}>Edit</Button>
                    </div>
                )}
            </Box>

            {isLoading && <>Loading</>}
            {isError && <>Error</>}

            {data &&
                (edit ? (
                    <UserDetailsEdit data={data.data} />
                ) : (
                    <UserDetailsView data={data.data} />
                ))}
        </div>
    );
};

export default UserDetails;
