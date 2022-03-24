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
    "/admin/project",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.getPaginationProjects
);

route.post(
    "/admin/project",
    verifyToken,
    authorization(["ADMIN"]),
    validate(createProjectSchema),
    PositionController.createProject
);

route.get(
    "/admin/project/:id",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.getProjectDetails
);

route.patch(
    "/admin/project/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validate(updateProjectDetailsSchema),
    PositionController.updateProjectDetails
);

route.delete(
    "/admin/project/:id",
    verifyToken,
    authorization(["ADMIN"]),
    PositionController.deleteProject
);

export default route;
