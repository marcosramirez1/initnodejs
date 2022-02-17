const express = require('express');
const userController = require('../controllers/userController')
const validator = require('express-joi-validation').createValidator();
const userValidationer = require("../validations/userValidationer")

const routes = (User) => {
	const userRouter = express.Router();
	const { getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, getUserByUserName } = userController(User); 
	const { querySchema, bodySchema } = userValidationer();

	userRouter.route('/users')
  .get(getUsers)
	.post(validator.body(bodySchema),  postUsers); 

	userRouter.route('/users/search')
		.get(validator.query(querySchema), getUserByUserName);

	userRouter.route('/users/:userId')
		.get(getUserById)
		.put(putUsers)
		.delete(deleteUserById);

	userRouter.route('/users/login')
	.post(postLogin);

	
		return userRouter;
	}
module.exports = routes; 