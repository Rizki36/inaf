// assets
import { IconDashboard, IconUsers, IconSubtask } from "@tabler/icons";

// constant
const icons = { IconDashboard, IconUsers, IconSubtask };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const taskGroup = {
    id: "task-groups",
    title: "Task Group",
    type: "group",
    children: [
        {
            id: "task-groups",
            title: "Task Group",
            type: "item",
            url: "/task-groups",
            icon: icons.IconSubtask,
            breadcrumbs: false,
        },
    ],
};

export default taskGroup;
