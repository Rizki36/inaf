import PostionDetailsEdit from "@/components/pages/positions/PositionDetailsEdit";
import PositionDetailsView from "@/components/pages/positions/PositionDetailsView";
import { usePositionDetails } from "@/libs/query/positionQuery";
import { Page } from "@/types/index";
import { Button, Grid } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { gridSpacing } from "@/configs/constant";
import AttachmentListCard from "@/components/pages/positions/widgets/AttachmentListCard";
import TotalPositionUsersCard from "@/components/pages/positions/widgets/TotalPositionUsersCard";

const PositionDetails: Page = () => {
    const router = useRouter();
    const { id } = router.query;
    const [edit, setEdit] = useState(false);
    const toggleEdit = useCallback(() => setEdit(!edit), [edit]);
    const { data, isError, isLoading, mutate } = usePositionDetails({
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
                        <TotalPositionUsersCard isLoading={false} />
                    </Grid>
                    <Grid item xs={12}>
                        <AttachmentListCard isLoading={false} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12}>
                {isLoading && <>Loading</>}
                {isError && <>Error</>}

                {data &&
                    (edit ? (
                        <PostionDetailsEdit
                            id={id as string}
                            data={data}
                            edit={{ edit, toggleEdit }}
                            mutate={mutate}
                            btnSecondary={btnSecondary}
                        />
                    ) : (
                        <PositionDetailsView
                            data={data}
                            btnSecondary={btnSecondary}
                        />
                    ))}
            </Grid>
        </Grid>
    );
};

export default PositionDetails;
