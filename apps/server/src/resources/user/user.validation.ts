import * as yup from "yup";
import { createUserBody, updateUserDetailsBody } from "./user.dto";

export const updateUserDetailsSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof updateUserDetailsBody, any>>({
        email: yup.string(),
        username: yup.string(),
        name: yup.string().min(4).max(25).required(),
        description: yup.string(),
        positionId: yup.string(),
    }),
});

export const createUserSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof createUserBody, any>>({
        email: yup.string(),
        username: yup.string(),
        name: yup.string().min(4).max(25).required(),
        description: yup.string(),
        password: yup.string().required(),
        positionId: yup.string(),
    }),
});
