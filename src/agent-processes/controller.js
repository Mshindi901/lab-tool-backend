import Processes from "./schema.js";
import Agent from '../agent/schema.js';
export const newProcess = async(req, res) => {
    try {
        const {agent_id, processes} = req.body;
        if(!agent_id || !processes){
            return res.status(400).json({success: false, message: 'Provide All Info'});
        };
        const agent = await Agent.findByPk(agent_id);
        if(!agent){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        const lab_id = agent.lab_id;
        const newProcess = await Processes.create({
            agent_id,
            lab_id,
            processes
        });
        return res.status(201).json({success: true, message: 'Created new process record'})
    } catch (error) {
        console.error(`Error with creating a new process record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const allLabProcess = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Lab record id'})
        };
        const Proceses = await Processes.findAll({where:{lab_id: id}});
        if(!Proceses || Proceses.length === 0){
            return res.status(404).json({success: false, message: 'No Process fetched'})
        };
        return res.status(200).json({success: true, message: 'fetched Proceses', data: Proceses})
    } catch (error) {
        console.error(`Error with getting all processes by Lab Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const agentProceses = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide agent record id'});
        };
        const proceses = await Processes.findAll({where:{agent_id: id}});
        if(!proceses||proceses.length === 0){
            return res.status(404).json({success: false, message: 'No Proceses Fetched'})
        };
        return res.status(200).json({success: true, message: 'Fetched proceses', data: proceses})
    } catch (error) {
        console.error(`Error with getting all proceses by agent Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const deleteProcess = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record ID'});
        };
        const process = await Processes.findByPk(id);
        if(!process){
            return res.status(404).json({success: false, message: 'Invalid record Id'});
        };
        await process.destroy();
        return res.status(200).json({success: true, message: 'Deleted Processes'})
    } catch (error) {
        console.error(`Error deleteing the agent process record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};