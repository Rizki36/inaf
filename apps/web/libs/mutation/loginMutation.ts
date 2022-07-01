import backendApi from "configs/api/backendApi";

interface loginMutationProps {
    username: string;
    password: string;
}

export const loginMutation = (props: loginMutationProps) => {
    const data = {
        username: props.username,
        password: props.password,
    };

    return backendApi.post("/signin", data);
};
