import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import dynamic from "next/dynamic";

import { gridSpacing } from "@/configs/constant";
import Grid from "@mui/material/Grid";
import { Page } from "../@types";
import {
    Avatar,
    AvatarGroup,
    Button,
    ButtonBase,
    Chip,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { useState } from "react";
import { IconCurrencyDollar } from "@tabler/icons";
import { IconUsers } from "@tabler/icons";
import { IconStack } from "@tabler/icons";
import { IconSubtask } from "@tabler/icons";
import Link from "next/link";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard: Page = () => {
    const [tab, setTab] = useState("1");
    return (
        <div className="w-full">
            <Grid container spacing={gridSpacing}>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                    <div className="bg-violet-800 text-white py-2 px-7 rounded-lg h-full">
                        <div className="flex items-center justify-between">
                            <h3>Project</h3>
                            <div className="flex items-center gap-x-1">
                                <ButtonBase sx={{ borderRadius: "12px" }}>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            background: "none",
                                        }}
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Avatar>
                                </ButtonBase>
                                <ButtonBase sx={{ borderRadius: "12px" }}>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            background: "none",
                                        }}
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Avatar>
                                </ButtonBase>
                            </div>
                        </div>
                        <h1 className="text-2xl">Dikirim.in</h1>
                    </div>
                </Grid>
                <Grid item lg={3} md={12} sm={12} xs={12}>
                    <div className="bg-white flex flex-col py-2 px-5 rounded-lg h-full">
                        <h3>Total Task</h3>
                        <div className="flex items-center justify-between">
                            <IconSubtask size={40} />
                            <h1 className="flex-1 self-end text-2xl font-bold text-right">
                                10
                            </h1>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={3} md={12} sm={12} xs={12}>
                    <div className="bg-white flex flex-col py-2 px-5 rounded-lg h-full">
                        <h3>User In Project</h3>
                        <div className="flex items-center justify-between w-full">
                            <AvatarGroup>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 24, height: 24 }}
                                />
                                <Avatar
                                    alt="Travis Howard"
                                    src="/static/images/avatar/2.jpg"
                                    sx={{ width: 24, height: 24 }}
                                />
                                <Avatar
                                    alt="Agnes Walker"
                                    src="/static/images/avatar/4.jpg"
                                    sx={{ width: 24, height: 24 }}
                                />
                                <Avatar
                                    alt="Trevor Henderson"
                                    src="/static/images/avatar/5.jpg"
                                    sx={{ width: 24, height: 24 }}
                                />
                            </AvatarGroup>
                            <h1 className="flex-1 self-end text-2xl font-bold text-right">
                                4
                            </h1>
                        </div>
                    </div>
                </Grid>
                <Grid item lg={2} md={12} sm={12} xs={12}>
                    <ButtonBase className="bg-white flex flex-col justify-center items-center py-8 rounded-lg h-full w-full">
                        <h3 className="mb-1 mt-0">Project Detail</h3>
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </ButtonBase>
                </Grid>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                    <div className="bg-white flex flex-col items-center py-5 px-5 rounded-lg h-full">
                        <div id="chart">
                            <Chart
                                series={[75]}
                                height={350}
                                type="radialBar"
                                options={{
                                    chart: {
                                        height: 350,
                                        type: "radialBar",
                                        toolbar: {
                                            show: true,
                                        },
                                    },
                                    plotOptions: {
                                        radialBar: {
                                            startAngle: -135,
                                            endAngle: 225,
                                            hollow: {
                                                margin: 0,
                                                size: "70%",
                                                background: "#fff",
                                                image: undefined,
                                                imageOffsetX: 0,
                                                imageOffsetY: 0,
                                                position: "front",
                                                dropShadow: {
                                                    enabled: true,
                                                    top: 3,
                                                    left: 0,
                                                    blur: 4,
                                                    opacity: 0.24,
                                                },
                                            },
                                            track: {
                                                background: "#fff",
                                                strokeWidth: "67%",
                                                margin: 0, // margin is in pixels
                                                dropShadow: {
                                                    enabled: true,
                                                    top: -3,
                                                    left: 0,
                                                    blur: 4,
                                                    opacity: 0.35,
                                                },
                                            },

                                            dataLabels: {
                                                show: true,
                                                name: {
                                                    offsetY: -10,
                                                    show: true,
                                                    color: "#888",
                                                    fontSize: "17px",
                                                },
                                                value: {
                                                    // @ts-ignore
                                                    formatter: function (val) {
                                                        return parseInt(
                                                            val + ""
                                                        );
                                                    },
                                                    color: "#111",
                                                    fontSize: "36px",
                                                    show: true,
                                                },
                                            },
                                        },
                                    },
                                    fill: {
                                        type: "gradient",
                                        gradient: {
                                            shade: "dark",
                                            type: "horizontal",
                                            shadeIntensity: 0.5,
                                            gradientToColors: ["#ABE5A1"],
                                            inverseColors: true,
                                            opacityFrom: 1,
                                            opacityTo: 1,
                                            stops: [0, 100],
                                        },
                                    },
                                    stroke: {
                                        lineCap: "round",
                                    },
                                    labels: ["Percent"],
                                }}
                            />
                        </div>
                        <h2>Task Progress</h2>
                    </div>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
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
                </Grid>
                <Grid item lg={2} md={12} sm={12} xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item sm={12}>
                            <Link href={"/projects"}>
                                <ButtonBase className="bg-white flex items-center justify-between py-5 px-5 rounded-lg w-full">
                                    <div className="flex items-center">
                                        <IconCurrencyDollar />
                                        <h4 className="my-0 ml-2">Project</h4>
                                    </div>
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </ButtonBase>
                            </Link>
                        </Grid>
                        <Grid item sm={12}>
                            <Link href={"/users"}>
                                <ButtonBase className="bg-white flex items-center justify-between py-5 px-5 rounded-lg w-full">
                                    <div className="flex items-center">
                                        <IconUsers />
                                        <h4 className="my-0 ml-2">User</h4>
                                    </div>
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </ButtonBase>
                            </Link>
                        </Grid>
                        <Grid item sm={12}>
                            <Link href={"/positions"}>
                                <ButtonBase className="bg-white flex items-center justify-between py-5 px-5 rounded-lg w-full">
                                    <div className="flex items-center">
                                        <IconStack />
                                        <h4 className="my-0 ml-2">Position</h4>
                                    </div>
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </ButtonBase>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
