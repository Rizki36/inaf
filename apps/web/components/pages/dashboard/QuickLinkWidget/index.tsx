import { gridSpacing } from "@/configs/constants";
import Grid from "@mui/material/Grid";
import { IconCurrencyDollar, IconStack, IconUsers } from "@tabler/icons";
import type { LinkItemType } from "./LinkItem";
import LinkItem from "./LinkItem";

const list: LinkItemType[] = [
    {
        title: "Project",
        href: "/projects",
        Icon: IconCurrencyDollar,
    },
    {
        title: "User",
        href: "/users",
        Icon: IconUsers,
    },
    {
        title: "Position",
        href: "/positions",
        Icon: IconStack,
    },
];

const QuickLinkWidget = () => {
    return (
        <Grid container spacing={gridSpacing}>
            {list.map((item) => (
                <Grid key={item.href} item xs={12}>
                    <LinkItem {...item} />
                </Grid>
            ))}
        </Grid>
    );
};

export default QuickLinkWidget;
