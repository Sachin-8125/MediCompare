import {PrismaClient} from '../generated/prisma/index.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

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
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
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

const loginUser = async(req,res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    
    try {
        const user = await prisma.user.findUnique({where: {email}});
        if(!user || !await bcrypt.compare(password, user.password)){
            return res.status(400).json({msg: "Invalid credentials"});
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
