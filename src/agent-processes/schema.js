import sequelize from '../config/db-config.js';
import { DataTypes } from 'sequelize';

const Processes = sequelize.define('agent_proceses', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    agent_id: {
        type: DataTypes.UUID,
        references:{
            model: 'agents',
            key: 'id'
        },
        allowNull: false
    },
    lab_id: {
        type: DataTypes.UUID,
        references: {
            model: 'labs',
            key: 'id'
        },
        allowNull: false
    },
    processes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    }
}, {timestamps: true});

export default Processes;