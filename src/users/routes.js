import express from 'express';
import { authenticate } from '../middleware/authentication.js';
import { authorize } from '../middleware/authorization.js';

import {
    getAllUsers,
    getAllUsersByInstitutionId,
    getUserById,
    updateUserById,
    updateUserPasswordById,
    deleteUserById
} from './controller.js';

const router = express.Router();

router.get('/users', authenticate, authorize('owner'), getAllUsers);
router.get('/users/institution/:id', authenticate, authorize('admin'), getAllUsersByInstitutionId);
router.get('/users/:id', getUserById);
router.put('/users/:id', authenticate, authorize('admin'), updateUserById);
router.put('/users/password/:id', authenticate, authorize('admin'), updateUserPasswordById);
router.delete('/users/:id', authenticate, authorize('admin'), deleteUserById);

export default router;