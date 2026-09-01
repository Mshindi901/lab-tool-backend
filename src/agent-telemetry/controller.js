import AgentTelemetry from "./schema.js";

export const createTelemetry = async (req, res) => {
    try {
        const { agent_id, cpu_usage, ram_usage, disk_usage, uptime, recorded_at } = req.body;
        if(!agent_id || !cpu_usage || !ram_usage || !disk_usage || !uptime || !recorded_at) {
            return res.status(400).json({success: false, message: 'Missing required fields'});
        };
        const newTelemetry = await AgentTelemetry.create({
            agent_id,
            cpu_usage,
            ram_usage,
            disk_usage,
            uptime,
            recorded_at
        });
        return res.status(201).json({success: true, message: 'Record added successfully'});
    } catch (error) {
        console.error(`Error creating telemetry record: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const getTelemetryByAgentId = async (req, res) => {
    try {
        const { agent_id } = req.params;
        if(!agent_id) {
            return res.status(400).json({success: false, message: 'Missing agent_id parameter'});
        };
        const telemetryRecords = await AgentTelemetry.findAll({where: {agent_id}});
        if(telemetryRecords.length === 0 || !telemetryRecords) {
            return res.status(404).json({success: false, message: 'Error getting records'});
        };
        return res.status(200).json({success: true, message: 'Records fetched successfully', data: telemetryRecords});
    } catch(error) {
        console.error(`Error fetching agent telemetry records: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const getAllTelemetry = async (req, res) => {
    try {
        const telemetryRecords = await AgentTelemetry.findAll();
        if(telemetryRecords.length === 0 || !telemetryRecords) {
            return res.status(404).json({success: false, message: 'Error getting records'});
        };
        return res.status(200).json({success: true, message: 'Records fetched successfully', data: telemetryRecords});
    } catch(error) {
        console.error(`Error fetching all telemetry records: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const deleteTelemetryById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({success: false, message: 'Missing id parameter'});
        };
        const deletedCount = await AgentTelemetry.destroy({where: {id}});
        if(deletedCount === 0) {
            return res.status(404).json({success: false, message: 'Record not found'});
        };
        return res.status(200).json({success: true, message: 'Record deleted successfully'});
    } catch (error) {
        console.error(`Error deleting telemetry record: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};