import * as PositionController from "./position.controller";
import express from "express";
import verifyToken from "../../middleware/verifToken";
import { authorization } from "../../middleware/authorization";
import {
    createPositionSchema,
    updatePositionDetailsSchema,
} from "./position.validation";
import validate from "../../middleware/validation";

const route = express.Router();

route.get(
    "/admin/positions",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.getPaginationPositions
);

route.post(
    "/admin/positions",
    verifyToken,
    authorization(["ADMIN"]),
    validate(createPositionSchema),
    PositionController.createPosition
);

route.get(
    "/admin/positions/:id",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.getPositionDetails
);

route.patch(
    "/admin/positions/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validate(updatePositionDetailsSchema),
    PositionController.updatePositionDetails
);

route.delete(
    "/admin/positions/:id",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.deletePosition
);

export default route;
