import Technician from "./schema.js";
import User from '../auth/schema.js';

export const createTechnician = async(req, res) => {
    try {
        const {lab_id, user_id} = req.body;
        if(!lab_id || !user_id){
            return res.status(400).json({success: false, message: 'Provide full info'})
        };
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({success: false, message: 'Authenticated Route. Please Login'})
        };
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({success: false, message: 'Invalid User ID'});
        };
        const institution_id = user.institution_id;
        const newTechnician = await Technician.create({
            institution_id,
            lab_id,
            user_id
        });
        return res.status(201).json({success: true, message: 'Created Technician record'})
    } catch (error) {
        console.error(`Error with creating a new Technician record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getAllTechniciansByInstitutionId = async(req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success: false, message: 'Authenticated route, please login'})
        };
        const user = await User.findByPk(user_id);
        if(!user){
            return res.status(400).json({success: false, message: 'Invalid User Id'});
        };
        const institutionId = user.institution_id;
        const technicians = await Technician.findAll({where:{institution_id: institutionId}});
        if(!technicians || technicians.length === 0){
            return res.status(404).json({success: false, message: 'Failed to fetch'})
        };
        return res.status(200).json({success: true, message: 'fetched Technicians', data: technicians})
    } catch (error) {
        console.error(`Error with getting all technicians by Institution ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const  getAllTechnicianByLabId = async(req, res) => {
    try {
        const {lab_id} = req.body;
        if(!lab_id){
            return res.status(400).json({success: false, message: 'Please provde lab id'})
        };
        const technicians = await Technician.findAll({where:{lab_id: lab_id}});
        if(!technicians || !technicians.length === 0){
            return res.status(404).json({success:false, message:'No Records fetched'})
        };
        return res.status(200).json({success: true, message: 'fetched Techniciians', data: technicians});
    } catch (error) {
        console.error(`Error with fetching all lab technicians ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getTechnicianInfoByUserId = async(req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success: false, message: 'Authenticated Route, please login'});
        };
        const technician = await Technician.findOne({where:{user_id: user_id}});
        if(!technician){
            return res.status(404).json({success: false, message: 'failed to fetch'});
        };
        return res.status(200).json({success: true, message: 'Fetched Technician Info', data: technician})
    } catch (error) {
        console.error(`Error with getting technician info ${error}`);
        return res.status(500).json({success: false, message: 'internal Server Error'});
    }
};

export const deleteTechnician = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'})
        };
        const technician = await Technician.findByPk(id);
        await technician.destroy();
        return res.status(200).json({success: true, message: 'Deleted Technician'})
    } catch (error) {
        console.error(`Error with deleting technician record ${error}`);
        return res.status(500).json({success: false, message: 'Internal server Error'});
    }
};