// material-ui
import Link from "next/link";
import { ButtonBase } from "@mui/material";

// project imports
import { defaultConfig } from "@/configs/themes/index";
import Logo from "@/components/ui-component/Logo";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase
        disableRipple
        // component={Link}
        // href={"defaultConfig.defaultPath"}
    >
        <Logo />
    </ButtonBase>
);

export default LogoSection;
