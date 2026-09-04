import User from "./schema.js";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

export const signUp = async(req, res) => {
    try {
        const {institution_id, name, email, password, role} = req.body;
        if(!institution_id || !name || !email || !password || !role){
            return res.status(400).json({success: false, message: 'Provide all info'})
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({institution_id, name, email, password: hashedPassword, role});
        return res.status(201).json({success: true, message: 'User record created', data: newUser});
    } catch (error) {
        console.error(`Error with creating new user record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const signIn = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({success: false, message: 'Provide email and password'})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success: false, message: 'User not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({success: false, message: 'Invalid credentials'})
        }
        const token = jwt.sign({id: user.id, email: user.email, role: user.role}, process.env.ACCESS_TOKEN, {expiresIn: '1h'});
        return res.status(200).json({success: true, message: 'User signed in successfully', token: token});
    } catch(error) {
        console.error(`Error with signing in user ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};