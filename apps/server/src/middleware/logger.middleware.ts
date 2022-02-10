import { NextFunction, Request, Response } from 'express'
import * as SimpleLogger from 'simple-node-logger'

interface RequestObjInterface {
    method: String,
    path: String,
    param?: Record<string, any> | Record<string, any>[],
    body?: Record<string, any> | Record<string, any>[]
}

interface ResponseObjInterface {
    statusCode: Number
}

const accessLog = SimpleLogger.createSimpleLogger({
    logFilePath: './log/access/' + (new Date().toLocaleDateString().split('/').join('-')) + '.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss'
});

const accessLogMiddleware = (): Record<string, any> => (req: Request, res: Response, next: NextFunction) => {
    console.log(req, res);
    let reqObject: RequestObjInterface = {
        method: req.method,
        path: req.path,
        param: req.params || null,
        body: req.body || null
    }

    let resObject: ResponseObjInterface = {
        statusCode: res.statusCode,
    }

    accessLog.info(JSON.stringify({
        reqObject,
        resObject
    }))

    next()
}

export default accessLogMiddleware