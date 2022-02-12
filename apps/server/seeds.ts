import { PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

const prisma = new PrismaClient();

async function main() {
    const fakerRounds = 100;
    dotenv.config();
    console.log("Seeding...");
    /// --------- Users ---------------
    for (let i = 0; i < fakerRounds; i++) {
        await prisma.user.create({
            data: {
                name: faker.name.firstName() + faker.name.lastName(),
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: "12345678",
                role: "USER",
            },
        });
    }
    console.log("end...");
}

main().catch((e) => console.error(e));
