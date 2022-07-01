import { NextPage } from "next";
import { useRouter } from "next/router";
import { useProfile } from "@/libs/query/userQuery";
import { AuthOptions } from "../@types";
import React, { useCallback, useEffect } from "react";
import Logo from "./ui/Logo";

interface Props extends AuthOptions {
    children: any;
}

const Auth: NextPage = (props: Props) => {
    const {
        mustLoggedIn = true,
        // redirectAuthenticated = "/",
        // redirectUnAuthenticated = "/login",
        children,
    } = props;

    const router = useRouter();
    const { data: profile, isError, isLoading } = useProfile();
    console.log("profile", profile, isError, isLoading);

    const handleRedirectUnAuthenticated = useCallback(() => {
        if (mustLoggedIn && isError) {
            console.log("unAuthenticated");
            router.replace("/login");
        }
    }, [isError, mustLoggedIn, router]);

    const handleRedirectAuthenticated = useCallback(() => {
        if (!mustLoggedIn && profile && !isError) {
            console.log("redirect Authenticated");
            router.push("/");
        }
    }, [isError, mustLoggedIn, profile, router]);

    useEffect(() => {
        handleRedirectUnAuthenticated();
    }, [handleRedirectUnAuthenticated]);

    // redirect user from login to redirectAuthenticated when is authenticated
    useEffect(() => {
        handleRedirectAuthenticated();
    }, [handleRedirectAuthenticated]);

    // loading
    if (isLoading || (!profile && mustLoggedIn))
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <Logo />
            </div>
        );

    return children;
};

export default Auth;
