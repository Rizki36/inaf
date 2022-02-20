import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { FC } from "react";
import MainLayout from "@/components/layout/MainLayout";

const AdminLayout: FC = ({ children }) => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <MainLayout>
            {/* test */}
            <CssBaseline />
        </MainLayout>
    );
};
export default AdminLayout;
