import * as yup from "yup";
import { createProjectBody, updateProjectDetailsBody } from "./project.dto";

export const createProjectSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof createProjectBody, any>>({
        name: yup.string().min(3).max(25).required(),
        description: yup.string().required(),
    }),
});

export const updateProjectDetailsSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof updateProjectDetailsBody, any>>({
        name: yup.string().min(3).max(25).required(),
        description: yup.string().required(),
    }),
});
