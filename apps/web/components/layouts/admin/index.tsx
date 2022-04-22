import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { FC } from "react";
import MainLayout from "@/components/layout/MainLayout";

const AdminLayout: FC = ({ children }) => {
    return (
        <MainLayout>
            <CssBaseline />
            {children}
        </MainLayout>
    );
};
export default AdminLayout;
