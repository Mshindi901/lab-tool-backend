import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db-connect.js';
import dotenv from 'dotenv';

import agentRoutes from './src/agent/routes.js';
import agentTelemetryRoutes from './src/agent-telemetry/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use('/api', agentRoutes);
app.use('/api', agentTelemetryRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log('Server is running');
});