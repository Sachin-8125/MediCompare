import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

//user registration
const registerUser = async(req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }
    try {
        const existingUser = await prisma.user.findUnique({where:{email}});
        if(existingUser){
            return res.status(400).json({msg:'User already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const user = await prisma.user.create({
            data: {
                name, email, password: hashedPassword
            },
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

//user login
const loginUser = async(req,res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    
    try {
        const user = await prisma.suer.findUnique({where: {email}});
        if(!user){
            return res.status(400).json({msg: "Invalid Credentials"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

//get current user
const getCurrentUser = async(req,res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: req.user.id},
            select: {id: true, name: true, email: true}
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export  {registerUser, loginUser,getCurrentUser};