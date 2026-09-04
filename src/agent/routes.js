import express from 'express';
import {
    newAgent,
    updateAgentFullInfo,
    getAllAgents
} from './controller.js';
import agentAuth from '../middleware/agent-auth.js';
import {authenticate} from '../middleware/authentication.js';
import {authorize} from '../middleware/authorization.js';

const router = express.Router();

router.post('/agent',authenticate, authorize('technician', 'admin'), newAgent);
router.put('/agent', agentAuth, updateAgentFullInfo);
router.get('/agents', authenticate, authorize('admin', 'technician'), getAllAgents);

export default router;