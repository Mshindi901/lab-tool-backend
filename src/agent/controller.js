import Agent from "./schema.js";
import crypto from 'crypto';

export const newAgent = async(req, res) => {
    try {
        const {name} = req.body
        if(!name){
            return res.status(400).json({success: false, message :'Please provide a name'})
        };
        const code = await crypto.randomInt(0, 10000).toString().padStart(4, '0');
        const new_agent = await Agent.create({
            agent_id: code,
            name,
            os,
            os_version,
            architecture,
            cpu,
            ram_total,
            disk_total,
            ip_address,
            mac_address,
            status,
            last_seen
        });
        return res.status(201).json({success: true, message: 'Created agent record', agent: new_agent});
    } catch (error) {
        console.error('Failed to create an agent');
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error
        })
    }
};

export const updateAgentFullInfo = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Please Provide Primary Key of Record'});
        };
        const {
            os,
            os_version,
            architecture,
            cpu,
            ram_total,
            disk_total,
            ip_address,
            mac_address,
            last_seen
        } = req.body;
        if(!os || !cpu || !ip_address || !mac_address){
            return res.status(404).json({success: false, message: 'Please Provide vital information'});
        };
        const agent = await Agent.findByPk(id);
        if(!agent){
            return res.status(404).json({success: false, message: 'Could not find agent record'});
        };
        const updated_agent = await agent.update({
            os,
            os_version,
            architecture,
            cpu,
            ram_total,
            disk_total,
            ip_address,
            mac_address,
            last_seen
        });
        if(!updated_agent){
            return res.status(404).json({success: false, message: 'Failed to update agent'});
        };
        return res.status(200).json({success: true, message: 'Updated the Agent Record'});
    } catch (error) {
        console.error(`Error with updating agent metrics ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getAllAgents = async(req, res) => {
    try {
        const agents = await Agent.findAll();
        if(!agents || agents.length === 0){
            return res.status(404).json({success: false, message: 'Failed to fetch agent record'});
        };
        return res.status(200).json({success: true, message: 'Found Agents', data: agents});
    } catch (error) {
        console.error(`Error with getting all the agents records ${error}`);
        return res.status(500).json({success: false, message: 'Internal server Error'})
    }
};