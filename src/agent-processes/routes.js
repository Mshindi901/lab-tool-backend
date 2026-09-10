import express from 'express';
import {
    newProcess,
    allLabProcess,
    agentProceses,
    deleteProcess
} from './controller.js';
import {authenticate} from '../middleware/authentication.js';
import {authorize} from '../middleware/authorization.js';


const router = express.Router();

router.post('/processes', newProcess);
router.get('/processes/lab/:id', allLabProcess);
router.get('/processes/agent/:id', agentProceses);
router.delete('/processes/:id', deleteProcess);

export default router;
