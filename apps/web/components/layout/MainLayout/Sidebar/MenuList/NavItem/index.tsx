import PropTypes from "prop-types";
import { useEffect } from "react";
import Link from "next/link";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Avatar,
    Chip,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
} from "@mui/material";

import { defaultConfig as config } from "@/configs/themes/index";

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useAppSelector, useAppDispatch } from "@/configs/redux/hooks";
import { MENU_OPEN, SET_MENU } from "@/configs/redux/customizationSlice";

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const customization = useAppSelector((state) => state.customization);
    const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));

    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width:
                    customization.isOpen.findIndex((id) => id === item?.id) > -1
                        ? 8
                        : 6,
                height:
                    customization.isOpen.findIndex((id) => id === item?.id) > -1
                        ? 8
                        : 6,
            }}
            fontSize={level > 0 ? "inherit" : "medium"}
        />
    );

    const itemHandler = (id) => {
        dispatch(MENU_OPEN({ id }));
        if (matchesSM) dispatch(SET_MENU({ opened: false }));
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split("/")
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch(MENU_OPEN({ id: item.id }));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Link href={`${config.basename}${item.url}`} passHref>
            <ListItemButton
                LinkComponent={"a"}
                disabled={item.disabled}
                sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    mb: 0.5,
                    alignItems: "flex-start",
                    backgroundColor:
                        level > 1 ? "transparent !important" : "inherit",
                    py: level > 1 ? 1 : 1.25,
                    pl: `${level * 24}px`,
                }}
                selected={
                    customization.isOpen.findIndex((id) => id === item.id) > -1
                }
                onClick={() => itemHandler(item?.id)}
            >
                <>
                    <ListItemIcon
                        sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}
                    >
                        {itemIcon}
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant={
                                    customization.isOpen.findIndex(
                                        (id) => id === item.id
                                    ) > -1
                                        ? "h5"
                                        : "body1"
                                }
                                color="inherit"
                            >
                                {item.title}
                            </Typography>
                        }
                        secondary={
                            item.caption && (
                                <Typography
                                    variant="caption"
                                    // @ts-ignore
                                    sx={{ ...theme.typography.subMenuCaption }}
                                    display="block"
                                    gutterBottom
                                >
                                    {item.caption}
                                </Typography>
                            )
                        }
                    />
                    {item.chip && (
                        <Chip
                            color={item.chip.color}
                            variant={item.chip.variant}
                            size={item.chip.size}
                            label={item.chip.label}
                            avatar={
                                item.chip.avatar && (
                                    <Avatar>{item.chip.avatar}</Avatar>
                                )
                            }
                        />
                    )}
                </>
            </ListItemButton>
        </Link>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number,
};

export default NavItem;
