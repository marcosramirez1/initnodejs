const express = require('express');
const userController = require('../controllers/userController')
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator();

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



const routes = (User) => {
	const userRouter = express.Router();
	const { getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, getUserByUserName } = userController(User); 

	userRouter.route('/users')
  .get(getUsers)
	.post(validator.body(bodySchema),  postUsers); 

	userRouter.route('/users/:userId')
		.get(getUserById)
		.put(putUsers)
		.delete(deleteUserById)

	userRouter.route('/users/:userName')
		.get(getUserByUserName)

	userRouter.route('/users/login')
	.post(postLogin)

	
		return userRouter;
	}
module.exports = routes; 