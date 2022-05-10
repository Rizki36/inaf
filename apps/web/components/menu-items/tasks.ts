// assets
import { IconSubtask } from "@tabler/icons";

// constant
const icons = { IconSubtask };

const task = {
    id: "tasks",
    title: "",
    type: "group",
    children: [
        {
            id: "tasks",
            title: "Tasks",
            type: "item",
            url: "/tasks",
            icon: icons.IconSubtask,
            breadcrumbs: false,
        },
    ],
};

export default task;
