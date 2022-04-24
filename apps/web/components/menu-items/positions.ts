import { IconStack } from "@tabler/icons";
const icons = { IconStack };

const users = {
    id: "positions",
    title: "Positions",
    type: "group",
    children: [
        {
            id: "positions",
            title: "Positions",
            type: "item",
            url: "/positions",
            icon: icons.IconStack,
            breadcrumbs: false,
        },
    ],
};

export default users;
