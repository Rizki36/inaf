import { IResponse } from './../../@types/index.d';

type data = Record<string, any>

export const successResponse = ({ message, data }: { message?: string, data?: Record<string, any> }): IResponse => {
	return {
		status: true,
		message: message ?? 'Success !',
		data: data ?? null,
		errors: null
	}
}

export const errorResponse = ({ message, errors }: { message?: string, errors?: Record<string, any> }): IResponse => {
	return {
		status: false,
		message: message ?? 'Error !',
		data: null,
		errors: errors ?? null
	}
}

export const createdResponse = (data?: data) => {
	return successResponse({
		message: 'Created !',
		data
	})
}

export const notFountResponse = (errors?: data) => {
	return errorResponse({
		message: 'Not Found !',
		errors
	})
}

export const unauthorizedResponse = (errors?: data) => {
	return errorResponse({
		message: 'Unauthorized !',
		errors
	})
}

export const unauthenticatedResponse = (errors?: data) => {
	return errorResponse({
		message: 'Unauthenticated!',
		errors
	})
}

export const errorValidationResponse = (errors?: data) => {
	return errorResponse({
		message: 'Data is not valid!',
		errors
	})
}

export const invalidPasswordResponse = (errors?: data) => {
	return errorResponse({
		message: 'Password is not valid!',
		errors
	})
}