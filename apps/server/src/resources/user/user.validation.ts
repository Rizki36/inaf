import * as yup from "yup";
import { updateUserDetailsBody } from "./user.dto";

export const updateUserDetailsSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof updateUserDetailsBody, any>>({
        email: yup.string(),
        username: yup.string(),
        name: yup.string().min(4).max(25).required(),
        description: yup.string(),
    }),
});
