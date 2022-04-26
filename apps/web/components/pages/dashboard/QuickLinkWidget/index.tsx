import { gridSpacing } from "@/configs/constant";
import ButtonBase from "@mui/material/ButtonBase";
import Grid from "@mui/material/Grid";
import { IconCurrencyDollar, IconStack, IconUsers } from "@tabler/icons";
import Link from "next/link";
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
                <Grid key={item.href} item sm={12}>
                    <LinkItem {...item} />
                </Grid>
            ))}
        </Grid>
    );
};

export default QuickLinkWidget;
