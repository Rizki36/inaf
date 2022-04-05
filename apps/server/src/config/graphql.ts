import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import { resolvers } from "../../prisma/generated/type-graphql";
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { Config, ExpressContext } from "apollo-server-express";

interface Context {
    prisma: PrismaClient;
}

async function getConfigGraphql() {
    const prisma = new PrismaClient();

    /** build graphql schema from prisma schema */
    const schema = await buildSchema({
        resolvers,
        validate: false,
    });

    /** config for apollo server */
    const config: Config<ExpressContext> = {
        schema,
        context: (): Context => ({ prisma }),
        introspection: true, //process.env.NODE_ENV !== "production"
        plugins: [
            // process.env.NODE_ENV === "production"
            //     ? ApolloServerPluginLandingPageDisabled()
            //     : ApolloServerPluginLandingPageGraphQLPlayground(),
            ApolloServerPluginLandingPageGraphQLPlayground({}),
        ],
    };

    return config;
}

export default getConfigGraphql;
