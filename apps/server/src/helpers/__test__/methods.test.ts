import * as methods from '../methods'

export default () => {
	describe('Should be equal with standard response', () => {
		test('successResponse', () => {
			expect(methods.successResponse({ data: { test: 'test' }, message: 'message' })).toEqual({
				status: true,
				message: 'message',
				data: {
					test: 'test',
				},
				errors: null
			})
		})

		test('errorResponse', () => {
			expect(methods.errorResponse({ errors: { test: 'test' }, message: 'message' })).toEqual({
				status: false,
				message: 'message',
				data: null,
				errors: {
					test: 'test',
				}
			})
		})

		test('createdResponse', () => {
			const res = methods.createdResponse({ test: 'test' })
			expect({ ...res, message: 'message' }).toEqual({
				status: true,
				message: 'message',
				data: {
					test: 'test',
				},
				errors: null
			})
		})

		test('notFountResponse', () => {
			const res = methods.notFountResponse({ test: 'test' })
			expect({ ...res, message: 'message' }).toEqual({
				status: false,
				message: 'message',
				data: null,
				errors: {
					test: 'test',
				},
			})
		})

		test('unauthorizedResponse', () => {
			const res = methods.unauthorizedResponse({ test: 'test' })
			expect({ ...res, message: 'message' }).toEqual({
				status: false,
				message: 'message',
				data: null,
				errors: {
					test: 'test',
				},
			})
		})

		test('unauthenticatedResponse', () => {
			const res = methods.unauthenticatedResponse({ test: 'test' })
			expect({ ...res, message: 'message' }).toEqual({
				status: false,
				message: 'message',
				data: null,
				errors: {
					test: 'test',
				},
			})
		})

		test('errorValidationResponse', () => {
			const res = methods.errorValidationResponse({ test: 'test' })
			expect({ ...res, message: 'message' }).toEqual({
				status: false,
				message: 'message',
				data: null,
				errors: {
					test: 'test',
				},
			})
		})

		test('invalidPasswordResponse', () => {
			const res = methods.invalidPasswordResponse({ test: 'test' })
			expect({ ...res, message: 'message' }).toEqual({
				status: false,
				message: 'message',
				data: null,
				errors: {
					test: 'test',
				},
			})
		})
	})
}