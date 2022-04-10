import { commonErrorMsg } from "@/configs/constant";
import { AxiosError } from "axios";
export const commonError = (e: AxiosError) => {
    if (!!e.response.data?.errors) {
        const errors = e.response.data?.errors;
        const firstErrorKey = Object.keys(errors)[0];
        return errors[firstErrorKey];
    }

    if (!!e.response.data?.message) return e.response.data?.message;

    return commonErrorMsg;
};
