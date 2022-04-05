import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import { crudResolvers } from "@generated/type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { Config, ExpressContext } from "apollo-server-express";

interface Context {
    prisma: PrismaClient;
}

async function getConfigGraphql() {
    const prisma = new PrismaClient();

    const schema = await buildSchema({
        resolvers: crudResolvers,
        validate: false,
    });

    const config: Config<ExpressContext> = {
        schema,
        context: (): Context => ({ prisma }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    };

    return config;
}

export default getConfigGraphql;
