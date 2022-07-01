import {
    CustomComponents,
    ICustomization,
} from "@/types/index";
import { createTheme, ThemeOptions } from "@mui/material/styles";

// assets
import colors from "../../assets/scss/_themes-vars.module.scss";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

export const theme = (customization: ICustomization) => {
    const color = colors;
    const themeOption: CustomComponents = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
        customization,
    };

    const themeTypographyOption = themeTypography(themeOption);
    const themeOptions: ThemeOptions = {
        direction: "ltr",
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: "48px",
                padding: "16px",
                "@media (min-width: 600px)": {
                    minHeight: "48px",
                },
            },
        },
        typography: themeTypographyOption,
    };

    const themes = createTheme(themeOptions);
    const styleOverrides = componentStyleOverrides(themeOption);
    themes.components = styleOverrides;

    return themes;
};

export const defaultConfig = {
    basename: "",
    defaultPath: "",
    isOpen: [], // for active default menu
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    opened: true,
};

export default theme;
