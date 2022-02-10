import { isExistUserBy } from '../validation';
import { PrismaClient } from "@prisma/client"

// define prisma client
let prisma = new PrismaClient()

export default () => {
	describe('isExistUserBy', () => {
		test('Should return true', async () => {
			const user = await prisma.user.findFirst();
			const isExist = await isExistUserBy({
				column: 'username',
				value: user?.username || ''
			})

			return isExist
		})

		test('Should return false', async () => {
			const isExist = await isExistUserBy({
				column: 'username',
				value: 'wrong username'
			})

			return isExist
		})
	})
}