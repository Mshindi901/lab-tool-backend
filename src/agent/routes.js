import express from 'express';
import {
    newAgent,
    updateAgentFullInfo,
    getAllAgents,
    getAgentByAgentId,
    getAgentById,
    getLabAgents,
    deleteAgent
} from './controller.js';
import agentAuth from '../middleware/agent-auth.js';
import {authenticate} from '../middleware/authentication.js';
import {authorize} from '../middleware/authorization.js';

const router = express.Router();

router.post('/agent',authenticate, authorize('technician', 'admin'), newAgent);
router.put('/agent', agentAuth, updateAgentFullInfo);
router.get('/agents', authenticate, authorize('admin', 'technician'), getAllAgents);
router.get('/agents/agent/:id', authenticate, authorize('technicican', 'admin'), getAgentByAgentId);
router.get('/agent/:id', authenticate, authorize('technician'), getAgentById);
router.get('/agent/lab/:id', authenticate, authorize('technician'), getLabAgents);
router.delete('/agent/:id', authenticate, authorize('technician', 'admin'), deleteAgent);

export default router;