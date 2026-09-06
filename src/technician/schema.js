import sequelize from "../config/db-config.js";
import { DataTypes } from "sequelize";

const Technician = sequelize.define('technicians', {
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    institution_id:{
        type: DataTypes.UUID,
        references:{
            model: 'institutions',
            key:'id'
        },
        allowNull: false
    },
    lab_id:{
        type: DataTypes.UUID,
        references:{
            model:'labs',
            key:'id'
        },
        allowNull: false
    },
    user_id:{
        type: DataTypes.UUID,
        references:{
            model: 'users',
            key: 'id'
        },
        allowNull: false
    }
}, {timestamps: true});

export default Technician;