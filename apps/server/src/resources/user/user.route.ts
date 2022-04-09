import * as UserController from "../user/user.controller";
import express from "express";
import verifyToken from "../../middleware/verifToken";
import { authorization } from "../../middleware/authorization";
import {
    createUserSchema,
    deleteUserSchema,
    updateUserSchema,
} from "./user.validation";
import validateRequest from "../../middleware/validationRequest";

const route = express.Router();

route.get(
    "/admin/users",
    verifyToken,
    authorization(["ADMIN"]),
    UserController.paginationUser
);

route.post(
    "/admin/users",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(createUserSchema),
    UserController.createUser
);

route.get(
    "/admin/users/:id",
    verifyToken,
    authorization(["ADMIN"]),
    UserController.userDetails
);

route.patch(
    "/admin/users/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(updateUserSchema),
    UserController.updateUser
);

route.delete(
    "/admin/users/:id",
    verifyToken,
    authorization(["ADMIN"]),
    validateRequest(deleteUserSchema),
    UserController.deleteUser
);

export default route;
