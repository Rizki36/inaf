import * as yup from 'yup'
import { isExistUserBy } from '../../helpers/validation';

export const signupSchema = yup.object({
	email: yup.string().email().required()
		.test('is_unique', 'Email is exist !', async (value) => {
			if (!value) return false;
			const isExist = await isExistUserBy({
				'column': 'email',
				'value': value
			})

			return !isExist
		}),
	username: yup.string().min(4).max(25).required()
		.test('is_unique', 'Username is exist !', async (value) => {
			if (!value) return false;
			const isExist = await isExistUserBy({
				'column': 'username',
				'value': value
			})

			return !isExist
		}),
	password: yup.string().min(8).max(25).required(),
	name: yup.string().min(4).max(25).required(),
})

export const signinSchema = yup.object({
	username: yup.string().min(4).max(25).required(),
	password: yup.string().min(8).max(25).required(),
})