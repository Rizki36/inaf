export * from "./src/resources/user/user.dto";
// export * from "./src/resources/user/user.validation";
export * from "./src/resources/position/position.dto";

import { User as IUser, Position as IPosition } from "@prisma/client";

export type User = IUser;
export type Position = IPosition;
