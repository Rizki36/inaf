import { StatusCodes } from "http-status-codes";

export class MyError extends Error {
    public code: number;
    constructor(code: number, message?: string) {
        super(message)
        this.name = 'MyError'
        this.code = code
    }
}

export class ErrorUnAuthorized extends MyError {
    constructor(message?: string) {
        super(StatusCodes.FORBIDDEN, message ?? 'Your not have access for this resource !')
        this.name = 'ErrorUnAuthorized'
    }
}

export class ErrorUnAuthenticated extends MyError {
    constructor(message?: string) {
        super(StatusCodes.UNAUTHORIZED, message ?? 'Your not authenticated !')
        this.name = 'ErrorUnAuthenticated'
    }
}

export class ErrorWrongPassword extends MyError {
    constructor(message?: string) {
        super(StatusCodes.BAD_REQUEST, message ?? 'Your password is wrong !')
        this.name = 'ErrorWrongPassword'
    }
}

export class ErrorUserNotFound extends MyError {
    constructor(message?: string) {
        super(StatusCodes.NOT_FOUND, message ?? 'User not found !')
        this.name = 'ErrorUserNotFound'
    }
}