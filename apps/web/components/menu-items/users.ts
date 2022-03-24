// assets
// @ts-ignore
import { IconDashboard, IconUsers } from "@tabler/icons";

// constant
const icons = { IconDashboard, IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const users = {
    id: "users",
    title: "Users",
    type: "group",
    children: [
        {
            id: "users",
            title: "Users",
            type: "item",
            url: "/users",
            icon: icons.IconUsers,
            breadcrumbs: false,
        },
    ],
};

export default users;
