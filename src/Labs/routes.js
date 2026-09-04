import express from 'express';
import {
    createLab,
    getAllLabs,
    getLabById,
    getLabByInstitutionId,
    updateLab,
    deleteLab
} from './controller.js';
import {authenticate} from '../middleware/authentication.js';
import {authorize} from '../middleware/authorization.js';

const router = express.Router();

router.post('/labs', authenticate, authorize('admin'), createLab);
router.get('/labs', authenticate, authorize('admin'), getAllLabs);
router.get('/labs/:id', authenticate, authorize('technician'), getLabById);
router.get('/labs/institution/:id', authenticate, authorize('admin'), getLabByInstitutionId);
router.put('/labs/:id', authenticate, authorize('admin'), updateLab);
router.delete('/labs/:id', authenticate, authorize('admin'), deleteLab);

export default router;