import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db-connect.js';
import dotenv from 'dotenv';

import agentRoutes from './src/agent/routes.js';
import agentTelemetryRoutes from './src/agent-telemetry/routes.js';
import authRoutes from './src/auth/routes.js';
import institutionRoutes from './src/Institution/routes.js';
import LabRoutes from './src/Labs/routes.js';
import TechnicianRoutes from './src/technician/routes.js';
import userRoutes from './src/users/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use('/api', agentRoutes);
app.use('/api', agentTelemetryRoutes);
app.use('/api', authRoutes);
app.use('/api', institutionRoutes);
app.use('/api', LabRoutes);
app.use('/api', TechnicianRoutes);
app.use('/api', userRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log('Server is running');
});