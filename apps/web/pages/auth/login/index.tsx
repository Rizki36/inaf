import LoginForm from "components/pages/auth/login/LoginForm";
import { Fragment } from "react";
import { Page } from "../../../@types";
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import Logo from "@/components/ui/Logo";
import AuthWrapper1 from "@/components/pages/auth/login/AuthWrapper1";
import AuthCardWrapper from "@/components/pages/auth/login/AuthCardWrapper";
import Link from "next/link";
import { HeartBroken } from "@mui/icons-material";

const Login: Page = () => {
    const theme = useTheme();

    return (
        <AuthWrapper1>
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                sx={{ minHeight: "100vh" }}
            >
                <Grid item xs={12}>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ minHeight: "calc(100vh - 68px)" }}
                    >
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link href="#" passHref>
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={"row"}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    spacing={1}
                                                >
                                                    <Typography
                                                        color={
                                                            theme.palette
                                                                .secondary.main
                                                        }
                                                        gutterBottom
                                                        variant={"h2"}
                                                    >
                                                        Hi, Welcome Back
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LoginForm />
                                        {/* <AuthLogin /> */}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            alignItems="center"
                                            xs={12}
                                        >
                                            <Typography
                                                component={Link}
                                                href="/pages/register/register3"
                                                variant="subtitle1"
                                                sx={{ textDecoration: "none" }}
                                            >
                                                <>
                                                    Create with{" "}
                                                    <HeartBroken
                                                        style={{
                                                            color: theme.palette
                                                                .error.dark,
                                                        }}
                                                    />
                                                </>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
            </Grid>
        </AuthWrapper1>
    );
};

Login.layout = Fragment;
Login.auth = {
    mustLoggedIn: false,
};

export default Login;
