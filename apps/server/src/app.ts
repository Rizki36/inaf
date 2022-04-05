import express, { Application, NextFunction, Request, Response } from "express";
import { cors } from "cors-ts";
import indexRoutes from "./resources/routes";
import morgan from "morgan";

/** error handlers */
import errorHandlerYup from "./middleware/errorHandlerYup";
import errorHandlerMyError from "./middleware/errorHandlerMyError";
import errorHandlerPrisma from "./middleware/errorHandlerPrisma";

/** graphql */
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import getConfigGraphql from "./config/graphql";

// import swaggerUi from "swagger-ui-express";
// import { optionsSwaggerUI, swaggerSpec } from "./lib/DocsSwagger";

const cookieParser = require("cookie-parser");
const port = process.env.PORT;

class App {
    public readonly application: Application;
    public graphqlPath: string = "/graphql";

    constructor() {
        this.application = express();

        // init plugins
        this.plugins();

        // init routes
        this.routes();
    }

    private async graphql() {
        const server = new ApolloServer(await getConfigGraphql());
        await server.start();
        server.applyMiddleware({
            app: this.application,
        });
    }

    private plugins() {
        this.application.use(
            cors({
                origin: [
                    "http://localhost:3000",
                    "https://inaf.vercel.app",
                    // `http://localhost:${port}`,
                ],
                credentials: true,
            })
        );
        this.application.use(express.json());
        this.application.use(express.urlencoded());
        this.application.use(cookieParser());
        this.application.use(morgan("common"));

        this.application.get(
            "/api-docs.json",
            (req: Request, res: Response) => {
                res.setHeader("Content-Type", "application/json");
                // res.send(swaggerSpec);
            }
        );

        // this.application.use('/api-docs', swaggerUi.serve)
        // this.application.get(
        // 	'/api-docs',
        // 	swaggerUi.setup(swaggerSpec, optionsSwaggerUI)
        // )
    }

    private async routes() {
        // init route graphql
        await this.graphql();

        this.application.use(indexRoutes);

        // Catch error 404 endpoint not found
        this.application.use("*", (req: Request, res: Response) => {
            res.status(404).send({
                msg: "Sorry, HTTP resource you are looking for was not found.",
            });
        });

        this.application.use(errorHandlerYup);
        this.application.use(errorHandlerPrisma);
        this.application.use(errorHandlerMyError);

        // Default Error handler
        this.application.use(function (
            err: any,
            req: Request,
            res: Response,
            next: NextFunction
        ) {
            console.log(err);
            console.log("errrrr");
        });
    }

    public async run() {
        console.log(`Node environment: ${process.env.NODE_ENV}`);

        this.application.listen(port, () => {
            console.log(
                `Example app listening at port http://localhost:${port}`
            );

            console.log(
                `Server is running, GraphQL Playground available at http://localhost:${port}${this.graphqlPath}`
            );
        });
    }
}

export default App;
