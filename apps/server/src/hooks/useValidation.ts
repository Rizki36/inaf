
function useValidation<T>(
	schema: any,
	value: any,
) {
	try {
		return schema.validateSync(value, {
			abortEarly: false,
			stripUnknown: true,
		})
	} catch (error) {

	}
}

export default useValidation