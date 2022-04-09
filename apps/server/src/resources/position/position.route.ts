import * as PositionController from "./position.controller";
import express from "express";
import verifyToken from "../../middleware/verifToken";
import { authorization } from "../../middleware/authorization";
import {
    createPositionSchema,
    deletePositionSchema,
    updatePositionSchema,
} from "./position.validation";
import validateRequest from "../../middleware/validationRequest";

const route = express.Router();

/** pagination position */
route.get(
    "/admin/positions",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.paginationPosition
);

/** create position */
route.post(
    "/admin/positions",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(createPositionSchema),
    PositionController.createPosition
);

/** position details */
route.get(
    "/admin/positions/:id",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.positionDetails
);

/** update position */
route.patch(
    "/admin/positions/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(updatePositionSchema),
    PositionController.updatePosition
);

/** delete position */
route.delete(
    "/admin/positions/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(deletePositionSchema),
    PositionController.deletePosition
);

export default route;
