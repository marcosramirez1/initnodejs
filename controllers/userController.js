const bcrypt = require('bcrypt')
const { json } = require("body-parser");
const req = require("express/lib/request");
const { restart } = require("nodemon");
const jwt = require('jsonwebtoken')


const userController = (User) => {

	const getUsers = async (req, res) => {
    const { query } = req;
    const response = await User.find(query);
    res.json(response);
    }
	
	const postUsers = (async (req, res) => {
    const { body } = req;
		const newUser = new User (body);  
		newUser.password = await bcrypt.hash(newUser.password, 10);
    
		const response = await newUser.save();
    
    res.json(response);
    })
	
	const getUserById = async (req, res) => {
		const { params } = req;
		const response = await User.findById(params.userId);
		res.json(response);
	}

		const getUserByUserName = async (req, res) => {
			const { query } = req
			const response = await User.findOne(query);
			res.json(response);
		}

	

	const putUsers = async (req, res) => {
		const { body } = req; 
		const response = await User.updateOne({
			_id: req.params.userId
		}, {
			$set: {
				firstName: body.firstName, 
				lastName: body.lastName,
				userName: body.userName,
				password: await bcrypt.hash(body.password, 10),
				email: body.email,
				address: body.address,
				phone: body.phone
			}
		})
		res.json(response);
	}
	const deleteUserById = async (req, res)=> {
		const id = req.params.userId;
		
		await User.findByIdAndDelete(id)
		
		res.status(202).json("User has been deleted...")
	}

	const postLogin = async (req, res) => {
		const {body} = req;
		const response = await User.findOne({
			"userName": body.userName
		});
		if(response === null) {
			res.status(401).json('User not found')

		}else if(await bcrypt.compare(body.password, response.password)) {
			const token = jwt.sign({ data: response}, 'secret'/*, {expiresIn: '3h'}*/)
			res.status(200).json({
				authentication: 'Successfully',
				token
			})
		}else {
			res.status(401).json('Invalid credentials')
		}
		console.log(response);
		

	}
	return {  getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, getUserByUserName};
}

module.exports = userController;
