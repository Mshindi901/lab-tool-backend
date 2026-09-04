import Institution from './schema.js';

export const createInstitution = async (req, res) => {
    try {
        const { name, description } = req.body;
        if(!name) {
            return res.status(400).json({success: false, message: 'Institution name is required'});
        };
        const newInstitution = await Institution.create({ name, description });
        return res.status(201).json({success: true, message: 'Institution record created', data: newInstitution});
    } catch(error) {
        console.error(`Error creating institution: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const getAllInstitutions = async (req, res) => {
    try {
        const institutions = await Institution.findAll();
        if(!institutions || institutions.length === 0) {
            return res.status(404).json({success: false, message: 'No institutions found'});
        };
        return res.status(200).json({success: true, message: 'Institutions fetched successfully', data: institutions});
    } catch(error) {
        console.error(`Error fetching institutions: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const getInstitutionById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({success: false, message: 'Institution ID not provided'});
        };
        const institution = await Institution.findByPk(id);
        if(!institution) {
            return res.status(404).json({success: false, message: 'Institution not found'});
        };
        return res.status(200).json({success: true, message: 'Institution fetched successfully', data: institution});
    } catch(error) {
        console.error(`Error fetching institution by ID: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const updateInstitution = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        if(!id) {
            return res.status(400).json({success: false, message: 'Institution ID not provided'});
        };
        const institution = await Institution.findByPk(id);
        if(!institution) {
            return res.status(404).json({success: false, message: 'Institution not found'});
        };
        const updatedInstitution = await institution.update({ name, description });
        return res.status(200).json({success: true, message: 'Institution updated successfully', data: updatedInstitution});
    } catch(error) {
        console.error(`Error updating institution: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const deleteInstitution = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({success: false, message: 'Institution ID not provided'});
        };
        const institution = await Institution.findByPk(id);
        if(!institution) {
            return res.status(404).json({success: false, message: 'Institution not found'});
        };
        await institution.destroy();
        return res.status(200).json({success: true, message: 'Institution deleted successfully'});
    } catch(error) {
        console.error(`Error deleting institution: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};