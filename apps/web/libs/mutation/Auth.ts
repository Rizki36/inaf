import { loginMutationProps } from "@/types/mutation";
import backendApi from "configs/api/backendApi";

export const loginMutation = (props: loginMutationProps) => {
    const data = {
        username: props.username,
        password: props.password,
    };

    return backendApi.post("/signin", data);
};
