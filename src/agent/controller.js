import Agent from "./schema.js";
import crypto from 'crypto';
import logger from "../utils/logger.js";

export const newAgent = async(req, res) => {

    try {
        const {name} = req.body
        if(!name){
            return res.status(400).json({success: false, message :'Please provide a name'})
        };
        const code = await crypto.randomInt(0, 10000).toString().padStart(4, '0');
        const new_agent = await Agent.create({
            agent_id: code,
            name
        });
        return res.status(201).json({success: true, message: 'Created agent record', agent: new_agent});
        logger.info('Agent Created successfully');
    } catch (error) {
        console.error(`Failed to create an agent record ${error}`);
        logger.error(`Error with agent creation ${error.message}`);       
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error
        })
    }
};

export const getLabAgents = async(req, res) => {
    try {
        const {id} = req.params;
        if(id){
            return res.status(400).json({success: false, message: 'Provide lab id'});
        };
        const agents = await Agent.findAll({where:{lab_id: id}});
        if(!agents || agents.length === 0){
            logger.warn('No agents Fetched By Lab ID')
            return res.status(404).json({success: false, message: 'No agents found'})
        };
        return res.status(200).json({success: true, message: 'fetched agents', data: agents});
    } catch (error) {
        console.error(`Error with getting all agents by Lab id ${error}`);
        return res.status(500).json({sucess: false, message: 'Internal server error'});
    }
};

export const getAllAgents = async(req, res) => {
    try {
        const agents = await Agent.findAll();
        if(!agents || agents.length === 0){
            return res.status(404).json({success: false, message : 'No agents found'})
        };
        return res.status(200).json({success: true, message: 'Fetched agents', data: agents})
    } catch (error) {
        console.error(`Error with getting all agents ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server error'})
    }
};

export const getAgentById = async(req, res) => {
    try {
        const {id} = req.params;
        if(id){
            return res.status(400).json({success: false, message: 'Provide lab id'});
        };
        const agent = await Agent.findByPk(id);
        if(!agent){
            return res.status(404).json({success: false, message : 'No agent found'})
        };
        return res.status(200).json({success: true, message: 'fetched agent', data: agent})
    } catch (error) {
        console.error(`Error with getting an agent by Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server error'});
    }
};


export const getAgentByAgentId = async(req, res) => {
    try {
        const {id} = req.params;
        if(id){
            return res.status(400).json({success: false, message: 'Provide agent id'});
        };
        const agent = await Agent.findAll({where:{agent_id: id}});
        if(!agent){
            return res.status(404).json({success: false, message : 'No agent found'})
        };
        return res.status(200).json({success: true, message: 'fetched agent', data: agent})
    } catch (error) {
        console.error(`Error with getting an agent by agent_id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const updateAgentFullInfo = async(req, res) => {
    try {
        const {id} = req.agent.id;
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

export const deleteAgent = async(req, res) => {
    try {
        const {id} = req.params;
        if(id){
            return res.status(400).json({success: false, message: 'Provide lab id'});
        };
        const agent = await Agent.findByPk(id);
        if(!agent){
            return res.status(404).json({success: false, message : 'No agent found'})
        };
        await agent.destroy();
        return res.status(200).json({success: true, message: 'Agent deleted'})
    } catch (error) {
        console.error(`Error with deleting an agent ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};