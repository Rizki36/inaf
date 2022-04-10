import { getOrderPage } from "../../helpers/pagination";
import { Project, PrismaClient, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getPage, getPerPage } from "../../helpers/pagination";
import {
    createProjectService,
    deleteProjectService,
    paginationProjectService,
    projectDetailsService,
    updateProjectService,
} from "./project.service";
import {
    ICreateProjectRequest,
    IPaginationProjectRequest,
    IUpdateProjectRequest,
} from "./project.dto";
import { createdResponse, successResponse } from "../../helpers/methods";

/** pagination project */
export const paginationProject = async (
    req: IPaginationProjectRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        let { page = "0", perPage = "40", field, sort, search } = req.query;

        const data = await paginationProjectService({
            perPage: getPerPage(perPage),
            page: getPage(page),
            sortPage: getOrderPage<Project>({
                sortProps: { field, sort },
                filds: ["createdAt", "name"],
                defaultField: "name",
                defaultSort: "asc",
            }),
            search,
        });

        res.send(data);
    } catch (error) {
        next(error);
    }
};

/** project details */
export const getProjectDetails = async (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const data = await projectDetailsService({
            id,
        });

        res.send(
            successResponse<typeof data>({
                data: data,
            })
        );
    } catch (error) {
        next(error);
    }
};

/** update project */
export const updateProject = async (
    req: IUpdateProjectRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const data = await updateProjectService({
            id,
            body: { name, description },
        });

        res.send(
            successResponse({
                data,
            })
        );
    } catch (error) {
        next(error);
    }
};

/** create project */
export const createProject = async (
    req: ICreateProjectRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { name, description } = req.body;

        const data = await createProjectService({
            body: {
                name,
                description,
            },
        });

        res.send(createdResponse(data));
    } catch (error) {
        next(error);
    }
};

/** delete project */
export const deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const data = await deleteProjectService({
            id,
        });

        res.send(
            successResponse<typeof data>({
                data,
            })
        );
    } catch (error) {
        next(error);
    }
};
