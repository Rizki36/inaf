import { Box, Card, CardContent, Typography } from "@mui/material";
import { getUserDetailsDTO } from "server";

interface UserDetailsViewProps {
    data: getUserDetailsDTO;
}

const UserDetailsView = (props: UserDetailsViewProps) => {
    const {
        data: { data },
    } = props;
    return (
        <Card>
            <CardContent>
                <Box
                    display={"flex"}
                    rowGap={5}
                    columnGap={10}
                    flexWrap={"wrap"}
                    justifyContent={"space-between"}
                    paddingY={5}
                    paddingX={7}
                >
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Name
                        </Typography>
                        <Typography variant="body2">{data.name}</Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Username
                        </Typography>
                        <Typography variant="body2">{data.username}</Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Email
                        </Typography>
                        <Typography variant="body2">{data.email}</Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Position
                        </Typography>
                        <Typography variant="body2">
                            {data.positionId}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserDetailsView;
