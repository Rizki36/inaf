export * from "./src/resources/user/user.dto";
export * from "./src/resources/position/position.dto";
export * from "./src/resources/project/project.dto";

import { User as IUser, Position as IPosition,Project as IProject } from "@prisma/client";

export type User = IUser;
export type Position = IPosition;
export type Project = IProject;
