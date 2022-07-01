import { gridSpacing } from "@/configs/constants";
import { Grid, Typography } from "@mui/material";
import MainCard from "../MainCard";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { FC } from "react";

const defaultMsg = "There was an error while loading data.";
const ErrorCard: FC<{ msg?: string }> = ({ msg = defaultMsg }) => {
    return (
        <MainCard>
            <Grid container spacing={gridSpacing} pt={3} pb={3}>
                <Grid
                    item
                    xs={12}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <ErrorOutlineIcon fontSize="large" />
                    <Typography variant="h3" mt={1} color="inherit">
                        {msg}
                    </Typography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ErrorCard;
