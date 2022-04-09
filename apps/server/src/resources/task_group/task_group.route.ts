import * as TaskController from "./task_group.controller";
import express from "express";
import verifyToken from "../../middleware/verifToken";
import { authorization } from "../../middleware/authorization";
import {
    createTaskGroupSchema,
    deleteTaskGroupSchema,
    updateTaskGroupSchema,
} from "./task_group.validation";
import validateRequest from "../../middleware/validationRequest";

const route = express.Router();

/** pagination task groups */
route.get(
    "/admin/task-groups",
    verifyToken,
    authorization(["ADMIN"]),
    TaskController.taskGroupPagination
);

/** create task group */
route.post(
    "/admin/task-groups",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(createTaskGroupSchema),
    TaskController.createTaskGroup
);

/** details taks */
route.get(
    "/admin/task-groups/:id",
    verifyToken,
    authorization(["ADMIN"]),
    TaskController.taskGroupDetails
);

/** update task */
route.patch(
    "/admin/task-groups/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(updateTaskGroupSchema),
    TaskController.updateTaskGroup
);

/** delete task */
// [ ]
route.delete(
    "/admin/task-groups/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(deleteTaskGroupSchema),
    TaskController.deleteTaskGroup
);

export default route;
