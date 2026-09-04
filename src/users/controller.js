import User from '../auth/schema.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if(!users || users.length === 0) {
            return res.status(404).json({success: false, message: 'No users found'});
        };
        return res.status(200).json({success: true, message: 'Users fetched successfully', data: users});
    } catch (error) {
        console.error(`Error fetching all users: ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    };
};

export const getAllUsersByInstitutionId = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Institution ID not provided'});
        };
        const users = await User.findAll({ where: { institution_id: id } });
        if(!users || users.length === 0) {
            return res.status(404).json({success: false, message: 'No users found for the given institution'});
        };
        return res.status(200).json({success: true, message: 'Users fetched successfully', data: users});
    } catch (error) {
        console.error(`Error fetching users by institution id: ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    };
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'User ID not provided'});
        }
        const user = await User.findByPk(id);
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }
        return res.status(200).json({success: true, message: 'User fetched successfully', data: user});
    } catch (error) {
        console.error(`Error fetching user by ID: ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { institution_id, name, email, role} = req.body;
        if(!id){
            return res.status(400).json({success: false, message: 'User ID not provided'});
        };
        const user = await User.findByPk(id);
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        };
        const updatedUser = await user.update(institution_id, name, email, role);
        return res.status(200).json({success: true, message: 'User updated', data: updateUser})
    } catch (error) {
        console.error(`Error updating user by ID: ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    };
};

export const updateUserPasswordById = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Please Provide user id'});
        };
        const {newPassword} = req.body;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({success: false, message: 'Failed to find user'})
        };
        const isMatch = await bcrypt.compare(newPassword, user.password);
        if(isMatch){
            return res.status(404).json({success: false, message: 'Password can not be the same'})
        };
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        return res.status(200).json({success: true, message: 'Password updated'})
    } catch (error) {
        console.error(`Error with updating the user password ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide id'})
        };
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({success: false, message: 'failed to found user'});
        };
        await user.destroy();
        return res.status(200).json({success: true, message: 'User Record deleted'})
    } catch (error) {
        console.error(`Error with deleting a user by Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
};
