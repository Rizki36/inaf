import * as yup from "yup";
import { createPositionBody, updatePositionBody } from "./position.dto";

export const createPositionSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof createPositionBody, any>>({
        name: yup.string().min(3).max(25).required(),
        description: yup.string().required(),
    }),
});

export const updatePositionSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof updatePositionBody, any>>({
        name: yup.string().min(3).max(25).required(),
        description: yup.string().required(),
    }),
});

export const deletePositionSchema = yup.object<Record<string, any>>({
    params: yup.object({
        id: yup.string().required(),
    }),
});
