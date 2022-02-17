const Joi = require('joi');
const userValidationer = () => {
	const bodySchema = Joi.object({
		firstName: Joi.string().alphanum().required(), 
		lastName:  Joi.string().alphanum().required(),
		userName: Joi.string().alphanum().required(),
		password:  Joi.string().alphanum().required().min(8).max(20),
		email: Joi.string().required()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'ar', 'net'] } }),
		address: Joi.string(),
		phone: Joi.number().required()
	})
	
	const querySchema = Joi.object({
		userName: Joi.string().required()
	})
	return {bodySchema, querySchema};
}

module.exports = userValidationer;