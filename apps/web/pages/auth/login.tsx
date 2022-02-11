import LoginForm from "components/pages/auth/login/LoginForm";
import { Fragment } from "react";
import { Page } from "../../@types";

const Login: Page = () => {
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen flex-col">
            <div className="bg-white w-[400px] mx-20 p-10 rounded-lg">
                <LoginForm />
            </div>
        </div>
    );
};

Login.layout = Fragment;
Login.auth = {
    mustLoggedIn: false,
};

export default Login;
