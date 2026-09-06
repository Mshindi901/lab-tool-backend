import express from  'express';
import {
    createTechnician,
    getAllTechnicianByLabId,
    getAllTechniciansByInstitutionId,
    getTechnicianInfoByUserId,
    deleteTechnician
} from './controller.js';
import {authenticate} from '../middleware/authentication.js';
import {authorize} from '../middleware/authorization.js';

const router = express.Router();

router.post('/technician', authenticate, authorize('admin'), createTechnician);
router.get('/technician/institution', authenticate, authorize('admin'), getAllTechniciansByInstitutionId);
router.get('/technician/lab/:id', authenticate, authorize('admin', 'technician'), getAllTechnicianByLabId);
router.get('/technician/user', authenticate, authorize('technician'), getTechnicianInfoByUserId);
router.delete('/technician/:id', authenticate, authorize('admin'), deleteTechnician);

export default router;