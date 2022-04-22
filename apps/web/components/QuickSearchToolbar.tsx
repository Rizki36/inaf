import * as React from "react";
import Box from "@mui/material/Box";
import { InputAdornment, OutlinedInput, useTheme } from "@mui/material";
import { shouldForwardProp } from "@mui/system";
import { styled } from "@mui/material/styles";
import { IconSearch } from "@tabler/icons";

interface QuickSearchToolbarProps {
    clearSearch: () => void;
    onChange: () => void;
    value: string;
}

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
    ({ theme }) => ({
        width: 300,
        marginLeft: 16,
        paddingLeft: 16,
        paddingRight: 16,
        "& input": {
            background: "transparent !important",
            paddingLeft: "4px !important",
        },
        [theme.breakpoints.down("lg")]: {
            width: 250,
        },
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginLeft: 4,
            background: "#fff",
        },
    })
);

const QuickSearchToolbar = (props: QuickSearchToolbarProps) => {
    const theme = useTheme();
    return (
        <Box sx={{ py: 2, width: 20 }}>
            <OutlineInputStyle
                value={props.value}
                onChange={props.onChange}
                placeholder="Search"
                startAdornment={
                    <InputAdornment position="start">
                        <IconSearch
                            stroke={1.5}
                            size="1rem"
                            color={theme.palette.grey[500]}
                        />
                    </InputAdornment>
                }
                inputProps={{ "aria-label": "weight" }}
            />
        </Box>
    );
};

export default QuickSearchToolbar;
