const express = require('express');
const bookController = require('../controllers/bookController')
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator();

const bodySchema = Joi.object({
	title: Joi.string().alphanum().required(),
	author: Joi.string().min(3).max(30).required(),
	genre: Joi.string().required(),
	read: Joi.boolean().required()
})

const routes = (Book) => {
	const bookRouter = express.Router();

	const { getBooks, postBooks, getBookById, putBooks, deleteBookById, getBookByAuthor, getBookByName } = bookController(Book); 

	bookRouter.route('/books')
  .get(getBooks)
  .post(validator.body(bodySchema),  postBooks);

	bookRouter
		.route('/books/:bookId')
		.get(getBookById)
		.put(putBooks)
		.delete(deleteBookById)
	
	bookRouter.route('/books/:bookAuthor')
	.get(getBookByAuthor)

	bookRouter.route('/books/:bookAuthor')
	.get(getBookByName)
		
		
		return bookRouter;
	}
module.exports = routes; 