import sequelize from '../config/db-config.js';
import { DataTypes } from 'sequelize';

const AgentTelemetry = sequelize.define('AgentTelemetry', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    agent_id: {
        type: DataTypes.UUID,
        references: {
            model: 'agents',
            key: 'id'
        },
        allowNull: false
    },
    cpu_usage: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    ram_usage: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    disk_usage: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    uptime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recorded_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {timestamps: true});

export default AgentTelemetry;