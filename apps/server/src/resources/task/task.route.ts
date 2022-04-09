import * as TaskController from "./task.controller";
import express from "express";
import verifyToken from "../../middleware/verifToken";
import { authorization } from "../../middleware/authorization";
import { createTaskSchema, updateTaskSchema } from "./task.validation";
import validateRequest from "../../middleware/validationRequest";

const route = express.Router();

/** pagination tasks */
route.get(
    "/admin/tasks",
    verifyToken,
    authorization(["ADMIN"]),
    TaskController.taskPagination
);

/** create task */
route.post(
    "/admin/tasks",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(createTaskSchema),
    TaskController.createTask
);

/** details taks */
route.get(
    "/admin/tasks/:id",
    verifyToken,
    authorization(["ADMIN"]),
    TaskController.taskDetails
);

/** update task */
route.patch(
    "/admin/tasks/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(updateTaskSchema),
    TaskController.updateTeam
);

/** delete task */
route.delete(
    "/admin/tasks/:id",
    verifyToken,
    authorization(["ADMIN"]),
    TaskController.deleteTask
);

export default route;
