import express from 'express';
import {
    createTelemetry,
    getTelemetryByAgentId,
    getAllTelemetry,
    deleteTelemetryById
} from  './controller.js';

const router = express.Router();

router.post('/telemetry', createTelemetry);
router.get('/telemetry/:agent_id', getTelemetryByAgentId);
router.get('/telemetry', getAllTelemetry);
router.delete('/telemetry/:id', deleteTelemetryById);

export default router;