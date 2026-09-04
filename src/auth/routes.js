import express from 'express';
import {
    signUp,
    signIn
} from './controller.js';

const router = express.Router();

router.post('/auth/signup', signUp);
router.post('/auth/signin', signIn);

export default router;