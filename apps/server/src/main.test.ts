import * as helpersTest from './helpers/__test__'
import * as resourcesTest from './resources/resources.test'

describe('Helpers Test', () => {
	helpersTest.methodsTest()
	helpersTest.validationTest()
})

describe('Resources Test', () => {
	resourcesTest.authTest()
})