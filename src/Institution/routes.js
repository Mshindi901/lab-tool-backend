import express from 'express';
import {
    createInstitution,
    getAllInstitutions,
    getInstitutionById,
    updateInstitution,
    deleteInstitution
} from './controller.js';

const router = express.Router();

router.post('/institutions', createInstitution);
router.get('/institutions', getAllInstitutions);
router.get('/institutions/:id', getInstitutionById);
router.put('/institution/:id', updateInstitution);
router.delete('/institution/:id', deleteInstitution);

export default router;