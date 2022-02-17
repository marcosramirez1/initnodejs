const Joi = require('joi');
const bookValidationer = () => {
	const bodySchema = Joi.object({
	title: Joi.string().alphanum().required(),
	author: Joi.string().min(3).max(30).required(),
	genre: Joi.string().required(),
	read: Joi.boolean().required()
})

	const querySchema = Joi.alternatives().try( 
		Joi.object({
		title: Joi.string().required()
		}),
		Joi.object({
		author: Joi.string().required()
	})
	)
		return {bodySchema, querySchema};
}
module.exports = bookValidationer;