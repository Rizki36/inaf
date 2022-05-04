import { successResponse } from './../../helpers/methods';
import express, { Request } from "express";
import { getDashboardService } from "./dashboard.service";

const router = express.Router();

router.get(
    "/",
    async (req: Request<any, any, any, { projectId: string }>, res) => {
        const { projectId } = req.query;

        const data = await getDashboardService({
            projectId,
        });

        res.send(successResponse({
            data
        }));
    }
);

export default router;
