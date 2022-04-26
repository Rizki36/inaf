import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
    Box,
    Button,
    Chip,
    List,
    ListItem,
    ListItemText,
    Tab,
} from "@mui/material";
import { useState } from "react";

const TaskWidget = () => {
    const [tab, setTab] = useState("1");

    return (
        <div className="bg-white flex flex-col py-1 px-5 rounded-lg h-full">
            <div className="flex items-center justify-between">
                <h2>Task</h2>
                <div>
                    <Button variant="outlined">Add</Button>
                </div>
            </div>
            <div>
                <TabContext value={tab}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                        }}
                    >
                        <TabList
                            onChange={(e, val) => setTab(val)}
                            aria-label="lab API tabs example"
                        >
                            <Tab label="Active" value="1" />
                            <Tab label="Done" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <List
                            sx={{
                                width: "100%",
                                bgcolor: "background.paper",
                            }}
                        >
                            <ListItem disablePadding>
                                <ListItemText
                                    primary="Membuat fitur login akses supplier"
                                    secondary="Due to 23/04/2022"
                                />
                                <div className="flex gap-x-1">
                                    <Chip
                                        size="small"
                                        label="• In Progress"
                                        color="secondary"
                                        variant="outlined"
                                    />

                                    <Chip
                                        size="small"
                                        label="• Urgen"
                                        color="error"
                                        variant="outlined"
                                    />
                                </div>
                            </ListItem>
                        </List>
                    </TabPanel>
                    <TabPanel value="2">
                        <List
                            sx={{
                                width: "100%",
                                bgcolor: "background.paper",
                            }}
                        >
                            <ListItem disablePadding>
                                <ListItemText
                                    primary="Membuat fitur login akses reseller"
                                    secondary="Due to 23/04/2022"
                                />
                                <div className="flex gap-x-1">
                                    <Chip
                                        size="small"
                                        label="• Done"
                                        color="success"
                                        variant="outlined"
                                    />

                                    <Chip
                                        size="small"
                                        label="• Urgen"
                                        color="error"
                                        variant="outlined"
                                    />
                                </div>
                            </ListItem>
                        </List>
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );
};

export default TaskWidget;
