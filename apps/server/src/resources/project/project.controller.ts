import { getOrderPage } from "../../helpers/pagination";
import { Project, PrismaClient, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getPage, getPerPage } from "../../helpers/pagination";
import {
    createProjectService,
    deleteProjectService,
    getPaginationProjectsService,
    getProjectDetailsService,
    updateProjectDetailsService,
} from "./project.service";
import { createProjectBody, updateProjectDetailsBody } from "./project.dto";
import { createdResponse } from "../../helpers/methods";

const prisma = new PrismaClient();

// get pagination project
export const getPaginationProjects = async (
    req: Request<
        {},
        {},
        {},
        {
            page?: string;
            perPage?: string;
            field: keyof Project;
            sort: "asc" | "desc";
            search?: string;
        }
    >,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { page = "0", perPage = "40", field, sort, search } = req.query;

    try {
        const data = await getPaginationProjectsService({
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

// get project details
export const getProjectDetails = async (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const data = await getProjectDetailsService({
            id,
        });

        return res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// get project details
export const updateProjectDetails = async (
    req: Request<{ id: string }, {}, { body: updateProjectDetailsBody }, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        console.log("body", body);

        const data = await updateProjectDetailsService({
            id,
            body,
        });

        return res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// create new project
export const createProject = async (
    req: Request<{}, {}, { body: createProjectBody }>,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const {
            body: { name, description },
        } = req.body;
        
        const project = await createProjectService({
            body: {
                name,
                description,
            },
        });

        res.send(createdResponse(project));
    } catch (error) {
        next(error);
    }
};

// update existing project
export const updateProject = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { name, email } = req.body as User;
    const user = await prisma.user.update({
        where: {
            id: req.params.id,
        },
        data: {
            name,
            email,
        },
    });

    res.send(user);
};

// delete project
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

        return res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
