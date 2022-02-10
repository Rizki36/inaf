/* eslint-disable prettier/prettier */
import dotenv from 'dotenv'

dotenv.config()

// node env
export const NODE_ENV = process.env.NODE_ENV ?? 'development'
export const HOST = process.env.HOST ?? '127.0.0.1'
export const PORT = process.env.PORT ?? 5000

// jwt access
export const JWT_SECRET_ACCESS_TOKEN: any = process.env.JWT_SECRET_ACCESS_TOKEN
export const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED ?? '1d'

// url production
export const URL_CLIENT_PRODUCTION = process.env.URL_CLIENT_PRODUCTION ?? 'https://example.com'
export const URL_SERVER_PRODUCTION = process.env.URL_SERVER_PRODUCTION ?? 'https://api.example.com'

// database
export const DB_CONNECTION = process.env.DB_CONNECTION ?? 'mysql'
export const DB_HOST = process.env.DB_HOST ?? '127.0.0.1'
export const DB_PORT = Number(process.env.DB_PORT) ?? 3306
export const DB_DATABASE = process.env.DB_DATABASE ?? 'example'
export const DB_USERNAME = process.env.DB_USERNAME ?? 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD ?? undefined
export const DB_OPERATOR_ALIAS = process.env.DB_OPERATOR_ALIAS ?? undefined
export const DB_TIMEZONE = process.env.DB_TIMEZONE ?? '+07:00' // for mysql = +07:00, for postgres = Asia/Jakarta

export const API_SECRET = process.env.API_SECRET ?? '123456789098765432'