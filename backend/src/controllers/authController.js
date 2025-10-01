import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//user registration
const registerUser = async(req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }
    try {
        
    } catch (error) {
        
    }
}