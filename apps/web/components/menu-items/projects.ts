import { IconCurrencyDollar } from "@tabler/icons";
const icons = { IconCurrencyDollar };

const projects = {
    id: "projects",
    title: "Projects",
    type: "group",
    children: [
        {
            id: "projects",
            title: "Projects",
            type: "item",
            url: "/projects",
            icon: icons.IconCurrencyDollar,
            breadcrumbs: false,
        },
    ],
};

export default projects;
