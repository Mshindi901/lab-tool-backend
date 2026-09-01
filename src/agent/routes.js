import express from 'express';
import {
    newAgent,
    updateAgentFullInfo,
    getAllAgents
} from './controller.js';

const router = express.Router();

router.post('/agent', newAgent);
router.put('/agent/:id', updateAgentFullInfo);
router.get('/agents', getAllAgents);

export default router;