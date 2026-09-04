import sequelize from '../config/db-config.js';
import { DataTypes } from "sequelize";

const Institution = sequelize.define('institutions', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:  false
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {timestamps: true});

export default Institution;