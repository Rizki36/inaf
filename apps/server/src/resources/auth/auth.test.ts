import request from 'supertest';
import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import MyApp from '../../app';
import { Application } from 'express';
import faker from '@faker-js/faker';

export default () => {
	let app: Application
	let username: string;
	let password: string;
	let token: string;
	beforeAll(() => {
		const myApp = new MyApp()
		app = myApp.application
		username = faker.internet.userName();
		password = faker.internet.password();
	})

	describe('auth', () => {
		describe('POST /signup', () => {
			test(`UNPROCESSABLE_ENTITY : ${StatusCodes.UNPROCESSABLE_ENTITY} status code`, async () => {
				const user: Partial<User> = {
					// username, // 
					// password,
					name: faker.name.findName(),
					email: faker.internet.email(),
				}

				const res = await request(app)
					.post(`/signup`)
					.send(user)

				expect(res.statusCode)
					.toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
			})

			test(`CREATED : ${StatusCodes.CREATED} status code`, async () => {
				const user: Partial<User> = {
					username,
					password,
					name: faker.name.findName(),
					email: faker.internet.email(),
				}

				const res = await request(app)
					.post(`/signup`)
					.send(user)

				expect(res.statusCode).toEqual(StatusCodes.CREATED);
			})
		})

		describe('POST /signin', () => {
			test(`NOT_FOUND : ${StatusCodes.NOT_FOUND} status code`, async () => {
				const user: Pick<User, 'username' | 'password'> = {
					username: 'wrong username',
					password: 'wrong password'
				}

				const res = await request(app)
					.post(`/signin`)
					.send(user)

				expect(res.statusCode)
					.toEqual(StatusCodes.NOT_FOUND);
			})

			test(`OK : ${StatusCodes.OK} status code`, async () => {
				const user: Pick<User, 'username' | 'password'> = {
					username,
					password
				}

				const res = await request(app)
					.post(`/signin`)
					.send(user)

				// asiggn token with accessToken
				token = res.body.data.accessToken

				expect(res.statusCode)
					.toEqual(StatusCodes.OK);
			})
		})

		describe('GET /account', () => {
			test(`UNAUTHORIZED : ${StatusCodes.UNAUTHORIZED} status code`, async () => {
				const wrongToken = 'qkgvgvhfvfcwasgvjafajfsdhgf';
				const res = await request(app)
					.get(`/account`)
					.set('Authorization', `Bearer ${wrongToken}`)

				expect(res.statusCode)
					.toEqual(StatusCodes.UNAUTHORIZED);
			})

			test(`OK : ${StatusCodes.OK} status code`, async () => {
				const res = await request(app)
					.get(`/account`)
					.set('Authorization', `Bearer ${token}`)

				expect(res.statusCode)
					.toEqual(StatusCodes.OK);
			})
		})
	})
}