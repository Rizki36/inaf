// material-ui
import { ButtonBase } from "@mui/material";

// project imports
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
