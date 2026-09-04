import Lab from "./schema.js";

export const createLab = async (req, res) => {
    try {
        const { institution_id, name, description } = req.body;
        if(!institution_id || !name) {
            return res.status(400).json({success: false, message: 'Institution ID and name are required'});
        };
        const newLab = await Lab.create({ institution_id, name, description });
        return res.status(201).json({success: true, message: 'Lab record created', data: newLab});
    } catch(error) {
        console.error(`Error creating lab: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const getAllLabs = async (req, res) => {
    try {
        const labs = await Lab.findAll();
        if(!labs || labs.length === 0) {
            return res.status(404).json({success: false, message: 'No labs found'});
        };
        return res.status(200).json({success: true, message: 'Labs fetched successfully', data: labs});
    } catch(error){
        console.error(`Error fetching labs: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const getLabById = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Lab Id not provided'});
        };
        const isLab = await Lab.findByPk(id);
        if(!isLab){
            return res.status(404).json({success: false, message: 'Failed to fetch lab record'});
        };
        return res.status(200).json({success: true, message: 'Lab record fetched', data: isLab});
    } catch(error) {
        console.error(`Error fetching lab by ID: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const getLabByInstitutionId = async (req, res) => {
    try {
        const { id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Institution ID not provided'});
        };
        const labs = await Lab.findAll({ where: { institution_id: id } });
        if(!labs || labs.length === 0) {
            return res.status(404).json({success: false, message: 'No labs found for the given institution'});
        };
        return res.status(200).json({success: true, message: 'Labs fetched successfully', data: labs});
    } catch(error) {
        console.error(`Error fetching lab by institution id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateLab = async (req, res) => {
    try {
        const { id } = req.params;
        const { institution_id, name, description } = req.body;
        if(!id){
            return res.status(400).json({success: false, message: 'Lab Id not provided'});
        };
        const isLab = await Lab.findByPk(id);
        if(!isLab){
            return res.status(404).json({success: false, message: 'Failed to fetch lab record'});
        };
        const updatedLab = await isLab.update({ institution_id, name, description });
        return res.status(200).json({success: true, message: 'Lab record updated', data: updatedLab});
    } catch(error){ 
        console.error(`Error updating lab: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const deleteLab = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Lab Id not provided'});
        };
        const isLab = await Lab.findByPk(id);
        if(!isLab){
            return res.status(404).json({success: false, message: 'Failed to fetch lab record'});
        };
        await isLab.destroy();
        return res.status(200).json({success: true, message: 'Lab record deleted'});
    } catch(error){ 
        console.error(`Error deleting lab: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};
