import * as PositionController from "./project.controller";
import express from "express";
import verifyToken from "../../middleware/verifToken";
import { authorization } from "../../middleware/authorization";
import {
    createProjectSchema,
    updateProjectDetailsSchema,
} from "./project.validation";
import validate from "../../middleware/validation";

const route = express.Router();

route.get(
    "/admin/projects",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.getPaginationProjects
);

route.post(
    "/admin/projects",
    verifyToken,
    authorization(["ADMIN"]),
    validate(createProjectSchema),
    PositionController.createProject
);

route.get(
    "/admin/projects/:id",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.getProjectDetails
);

route.patch(
    "/admin/projects/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validate(updateProjectDetailsSchema),
    PositionController.updateProjectDetails
);

route.delete(
    "/admin/projects/:id",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.deleteProject
);

export default route;
