import { AsyncReturnType, IResponse } from "./../../../@types/index.d";
import { getDashboardService } from "./dashboard.service";

export type GetDashboardResponse = IResponse<
    AsyncReturnType<typeof getDashboardService>,
    null
>;
