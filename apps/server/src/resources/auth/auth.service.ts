import { ErrorUserNotFound, ErrorWrongPassword } from './../../lib/Errors';
import { PrismaClient, User } from '@prisma/client';

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


// define prisma client
const prisma = new PrismaClient()

// signup Params
interface SignupParams {
    email: string,
    password: string
    username: string,
    name: string
}

// signup service
export const signupService = async (props: SignupParams) => {

    // extract data
    const { email, password, username, name } = props

    // get user
    const user = await prisma.user.create({
        data: {
            email,
            password: bcrypt.hashSync(password, 8),
            username,
            name
        }
    })

    // remove password
    const response: Partial<User> = user
    delete response.password

    return response;
}

interface SigninParams {
    password: string
    username: string,
}

// signin service
export const signinService = async (props: SigninParams) => {

    // extract data
    const { password, username } = props

    // get first user based on username
    const user = await prisma.user.findFirst({
        where: {
            username
        }
    })

    // if not exist 
    if (!user) throw new ErrorUserNotFound();

    //comparing passwords
    var passwordIsValid = bcrypt.compareSync(
        password,
        user.password
    );

    // checking if password was valid and send response accordingly
    if (!passwordIsValid) throw new ErrorWrongPassword()

    //signing token with user id
    var token = jwt.sign({
        id: user.id
    }, process.env.API_SECRET, {
        expiresIn: 86400
    });

    return {
        user: {
            id: user.id
        },
        accessToken: token,
    }
}


export const accountService = async (id: number) => {
    const user = await prisma.user.findFirst({
        where: {
            id
        }
    })

    if (!user) throw new ErrorUserNotFound()

    // remove password
    const response: Partial<User> = user
    delete response.password

    return response;
}

