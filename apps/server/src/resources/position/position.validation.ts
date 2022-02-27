import * as yup from "yup";
import { createPositionBody, updatePositionDetailsBody } from "./position.dto";

export const createPositionSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof createPositionBody, any>>({
        name: yup.string().min(3).max(25).required(),
        description: yup.string().required(),
    }),
});

export const updatePositionDetailsSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof updatePositionDetailsBody, any>>({
        name: yup.string().min(3).max(25).required(),
        description: yup.string().required(),
    }),
});
