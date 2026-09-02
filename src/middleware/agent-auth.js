import Agent from '../agent/schema.js';

export default function agentAuth(req, res, next) {
    try {
        const agent_auth = req.headers['x-agent-id'];
        if(!agent_auth) {
            return res.status(401).json({success: false, message: 'No agent id provided in request headers'});
        };
        const agent = Agent.findOne({agent_id: agent_auth});
        if(!agent) {
            return res.status(401).json({success: false, message: 'Agent not found'});
        };
        req.agent = agent;
        next();
    } catch(error) {
        console.error(`Error with agent authentication middleware: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};