/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'

const baseRoutes = path.resolve(`${__dirname}/../docs/swagger/routes`)
// const baseSchemas = path.resolve(`${__dirname}/../docs/swagger/schemas`)

const getDocs = (basePath: string | Buffer): {} => {
	return fs.readdirSync(basePath).reduce((acc, file) => {
		const data = require(`${baseRoutes}/${file}`)
		acc = {
			...acc,
			...data,
		}
		return acc
	}, {})
}

const docsSources = getDocs(baseRoutes)
// const docsSchemes = getDocs(baseSchemas)

let baseURLServer = []
let swaggerOptURL = []

export const swaggerOptions = {
	definition: {
		info: {
			title: `Api Docs`,
			description: `This is Api Documentation`,
			version: '1.0.0',
		},
		openapi: '3.0.1',
		// Set GLOBAL
		// security: [
		//   {
		//     auth_token: []
		//   }
		// ],
		components: {
			securitySchemes: {
				auth_token: {
					type: 'apiKey',
					in: 'header',
					name: 'Authorization',
					description:
						'JWT Authorization header using the JWT scheme. Example: “Authorization: JWT {token}”',
				},
			},
			// schemas: docsSchemes,
			parameters: {
				page: {
					in: 'query',
					name: 'page',
					required: false,
					default: 1,
				},
				pageSize: {
					in: 'query',
					name: 'pageSize',
					required: false,
					default: 10,
				},
				filtered: {
					in: 'query',
					name: 'filtered',
					required: false,
					default: [],
					description: 'Example: [{"id": "email", "value": "anyValue"}]',
				},
				sorted: {
					in: 'query',
					name: 'sorted',
					required: false,
					default: [],
					description: 'Example: [{"id": "createdAt", "desc": true}]',
				},
			},
		},
		paths: docsSources,
	},
	apis: [],
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
export const optionsSwaggerUI = {
	explorer: true,
	swaggerOptions: {},
}
