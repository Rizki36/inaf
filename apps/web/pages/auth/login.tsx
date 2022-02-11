import { Button, TextField } from "@mui/material";
import { Fragment } from "react";
import { Page } from "../../@types";

const Login: Page = () => {
    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <div className="w-[500px] mx-20 p-10 bg-gray-100 rounded-lg">
                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    className="w-full"
                    margin="dense"
                />
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    className="w-full"
                    margin="dense"
                />
                <div className="flex justify-center mt-10">
                    <Button variant="contained">Login</Button>
                </div>
            </div>
        </div>
    );
};

Login.layout = Fragment;
Login.auth = {
    mustLoggedIn: false,
};

export default Login;
