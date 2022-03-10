import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { AuthOptions } from "../@types";
import { useAppDispatch, useAppSelector } from "../configs/redux/hooks";
import { logout, setUser } from "../configs/redux/userSlice";
import { NextPage } from "next";
import { useProfile } from "@/libs/query/userQuery";

interface Props extends AuthOptions {
    children: any;
}

const Auth: NextPage = (props: Props) => {
    const {
        mustLoggedIn = true,
        redirectAuthenticated = "/",
        redirectUnAuthenticated = "/login",
        children,
    } = props;

    const router = useRouter();
    const { data: profile, isError, isLoading } = useProfile();
    console.log("profile", profile, isError, isLoading);

    useEffect(() => {
        if (mustLoggedIn && isError) {
            console.log("unAuthenticated");
            router.replace("/login");
        }
    }, [isError]);

    // redirect user from login to redirectAuthenticated when is authenticated
    useEffect(() => {
        if (!mustLoggedIn && profile && !isError) {
            console.log("redirect Authenticated");
            router.push("/");
        }
    }, [mustLoggedIn, profile, isError]);

    // loading
    if (isLoading) return <></>;

    return children;
};

export default Auth;
