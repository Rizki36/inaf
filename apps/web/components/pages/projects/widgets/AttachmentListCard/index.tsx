import {
    Button,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

import MainCard from "@/components/ui-component/cards/MainCard";
import SkeletonPopularCard from "@/components/ui-component/cards/Skeleton/PopularCard";

import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { gridSpacing } from "@/configs/constant";
import AnimateButton from "@/components/ui-component/extended/AnimateButton";
import AttachmentItem from "./AttachmentItem";

const AttachmentListCard = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    alignContent="center"
                                    justifyContent="space-between"
                                >
                                    <Grid item>
                                        <Typography variant="h4">
                                            Attachments
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                fullWidth
                                                size="small"
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Add Task
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <AttachmentItem />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions
                        sx={{ p: 1.25, pt: 0, justifyContent: "center" }}
                    >
                        <Button size="small" disableElevation>
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

export default AttachmentListCard;
