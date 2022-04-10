import * as PositionController from "./project.controller";
import express from "express";
import {
    createProjectSchema,
    deleteProjectSchema,
    updateProjectSchema,
} from "./project.validation";
import verifyToken from "../../middleware/verifToken";
import { authorization } from "../../middleware/authorization";
import validateRequest from "../../middleware/validationRequest";

const route = express.Router();

/** pagination project */
route.get(
    "/admin/projects",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.paginationProject
);

/** create project */
route.post(
    "/admin/projects",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(createProjectSchema),
    PositionController.createProject
);

/** project details */
route.get(
    "/admin/projects/:id",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.getProjectDetails
);

/** update project */
route.patch(
    "/admin/projects/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(updateProjectSchema),
    PositionController.updateProject
);

/** delete project */
route.delete(
    "/admin/projects/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(deleteProjectSchema),
    PositionController.deleteProject
);

export default route;
