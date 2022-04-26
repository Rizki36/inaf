import { Page } from "../@types";
import Dashboard from "@/components/pages/dashboard";
import { useAppSelector } from "@/configs/redux/hooks";

const DashboardPage: Page = () => {
    return (
        <div className="w-full">
            <Dashboard />
        </div>
    );
};

export default DashboardPage;
