const bookController = (Book) => {

	const getBooks = async (req, res) => {
    const { query } = req;
    const response = await Book.find(query);
    res.json(response);
    }
	
	const postBooks = (async (req, res) => {
    const { body} = req;
		const newBook = new Book (body);
    const response = await newBook.save();
    res.json(response);
    })
	
	const getBookByAuthor = async (req, res) => {
		const { query } = req;
		const response = await Book.find(query);
		res.json(response);
		}
		
	const getBookByName = async (req, res) => {
		const { query } = req;
		const response = await Book.find(query);
		res.json(response);
		}

	const getBookById = async (req, res) => {
		const { params } = req;
		const response = await Book.findById(params.bookId);
		res.json(response);
		}

	
	const putBooks = async (req, res) => {
		const { body } = req; 
		const response = await Book.updateOne({
			_id: req.params.bookId
		}, {
			$set: {
				title: body.title,
				genre: body.genre,
				author: body.author,
				read: body.read 
			}
		})
		res.json(response);
	}
	const deleteBookById = async (req, res)=> {
		const id = req.params.bookId;
		await Book.findByIdAndDelete(id)
		res.status(202).json("Book has been deleted...")
	}

	return { getBooks, postBooks, getBookById, putBooks, deleteBookById, getBookByAuthor, getBookByName};
}

module.exports = bookController; 
