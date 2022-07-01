// assets
import { IconUsers } from "@tabler/icons";

// constant
const icons = { IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const users = {
    id: "users",
    title: "",
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
