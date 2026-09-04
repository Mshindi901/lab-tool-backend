import sequelize from '../config/db-config.js'
import { DataTypes } from 'sequelize'

const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    institution_id: {
        type: DataTypes.UUID,
        references: {
            model: 'institutions',
            key: 'id'
        },
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        unique:  true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:  false
    },
    role: {
        type: DataTypes.ENUM('admin', 'technician', 'owner'),
        allowNull:  false
    }
}, {timestamps: true});

export default User;