import * as React from "react";
import Link from "next/link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";

export const menuItems = (
    <React.Fragment>
        <Link href={"/"} passHref>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>
        <Link href={"/users"} passHref>
            <ListItemButton>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>
        </Link>
    </React.Fragment>
);
