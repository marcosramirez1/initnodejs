const express = require('express');
const bookController = require('../controllers/bookController')
const validator = require('express-joi-validation').createValidator();
const bookValidationer = require('../validations/bookValidationer')

const routes = (Book) => {
	const bookRouter = express.Router();
	const { getBooks, postBooks, getBookById, putBooks, deleteBookById, getBookByAuthor, getBookByName } = bookController(Book); 
	const {bodySchema, querySchema} = bookValidationer();

	bookRouter.route('/books')
  .get(getBooks)
  .post(validator.body(bodySchema),  postBooks);

	bookRouter.route('/books/search/author')
	.get(validator.query(querySchema), getBookByAuthor)

	bookRouter.route('/books/search/name')
	.get(validator.query(querySchema), getBookByName)

	bookRouter
		.route('/books/:bookId')
		.get(getBookById)
		.put(putBooks)
		.delete(deleteBookById)
	

		
		
		return bookRouter;
	}
module.exports = routes; 