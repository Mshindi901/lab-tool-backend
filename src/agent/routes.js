import express from 'express';
import {
    newAgent,
    updateAgentFullInfo,
    getAllAgents
} from './controller.js';
import agentAuth from '../middleware/agent-auth.js';

const router = express.Router();

router.post('/agent', newAgent);
router.put('/agent/:id', agentAuth, updateAgentFullInfo);
router.get('/agents', getAllAgents);

export default router;