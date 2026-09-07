import sequelize from "../config/db-config.js";
import { DataTypes } from "sequelize";

const Agent = sequelize.define('agents', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:  false
    },
    agent_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    lab_id: {
        type: DataTypes.UUID,
        references: {
            model: 'labs',
            key: 'id'
        },
        allowNull: true        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    o_s: {
        type:DataTypes.STRING,
        allowNull: true
    },
    os_version: {
        type: DataTypes.STRING,
        allowNull: true
    },
    architecture: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cpu: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ram_total: {
        type: DataTypes.STRING,
        allowNull: true
    },
    disk_total: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mac_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false
    },
    last_seen: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {timestamps: true});

export default Agent;