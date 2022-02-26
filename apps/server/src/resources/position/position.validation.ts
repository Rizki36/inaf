import * as yup from "yup";
import { updatePositionDetailsBody } from "./position.dto";

export const updatePositionDetailsSchema = yup.object<Record<string, any>>({
    body: yup.object<Record<keyof updatePositionDetailsBody, any>>({
        name: yup.string().min(3).max(25).required(),
        description: yup.string().required(),
    }),
});
